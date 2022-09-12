import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { catchUserTransactions } from "../../Services/ports";
import { ExtractWrapper, ExtractContainer, Transaction, CreateTransaction } from "./style";
import dayjs from 'dayjs';

export default function Extract({ userData }) {
    const [transactions, setTransactions] = useState([]);
    const config = {
        headers: {
            "Authorization": `Bearer ${userData.token}`
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        const promise = catchUserTransactions(config);

        promise
        .then(res => setTransactions([...res.data]))
        .catch(error => {
            const errorStatus = error.response.status;
            switch (errorStatus) {
                case 401:
                    alert('Erro de validação, refaça o login');
                    break;
                default:
                    alert('Algo deu errado, tente novamente');
                    break;
            }
        });
    }, []);

    return (
        <>
            <ExtractWrapper positive={true}>
                <div>
                    <h2>Olá, {userData.name}</h2>
                    <ion-icon name="exit-outline" onClick={() => navigate('/')}></ion-icon>
                </div>
                <Transactions transactions={transactions} />
            </ExtractWrapper>
            <CreateTransaction>
                <button onClick={() => navigate('/add-transaction', { state: "earn" })}>
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <p>Nova<br />entrada</p>
                </button>
                <button onClick={() => navigate('/add-transaction', { state: "spent" })}>
                    <ion-icon name="remove-circle-outline"></ion-icon>
                    <p>Nova<br />saída</p>
                </button>
            </CreateTransaction>
        </>
    )
}

function Transactions({ transactions }) {
    const balance = transactions
    .map(transaction => transaction.type === "spent" ? -Number(transaction.value) : Number(transaction.value))
    .reduce((a, b) => a + b, 0);

    const formatedBalance = Math.abs(balance).toFixed(2).replace('.', ',');

    return (
        <ExtractContainer positive={balance >= 0}>
            <div className="transactions">
                {
                    transactions.length === 0 ?
                    <div className="empty">
                        <p>Não há registros de entrada ou saída</p>
                    </div> :
                    <>
                        {transactions.map((transactionData, index) => <TransactionLine key={index} transactionData={transactionData} />)}
                        <div className="balance">
                            <p>Saldo</p>
                            <strong>{formatedBalance}</strong>
                        </div>
                    </>
                }
            </div>
        </ExtractContainer>
    )
}

function TransactionLine({ transactionData }) {
     const formatedValue = Number(transactionData.value).toFixed(2).replace('.', ',');
     const formatedDate =  dayjs(transactionData.date).format('DD/MM')

    return (
         <Transaction transactionType={transactionData.type}>
             <div>
                 <span>{formatedDate}</span>
                <p>{transactionData.description}</p>
            </div>
             <div>
                 <strong>{formatedValue}</strong>
                 <span>X</span>
             </div>
         </Transaction>
    ) 
}