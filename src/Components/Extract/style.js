import styled from "styled-components";

const ExtractWrapper = styled.div`
    width: 100%;
    max-width: 600px;
    position: relative;
    
    div {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    h2,ion-icon {
        font-size: 26px;
        font-weight: bold;
        margin-bottom: 22px;
    }
    
    ion-icon {
        cursor: pointer;
    }
`;

const ExtractContainer = styled.div`
    background-color: #FFFFFF;
    height: 446px;
    justify-content: flex-start;
    flex-direction: column;
    border-radius: 5px;
    padding: 23px 12px 50px 12px;
   
    .transactions {
        flex-direction: column;
        overflow-y: scroll;
    }
   
    .transactions::-webkit-scrollbar {
        display: none;
    }
    
    .transactions .empty {
        width: 180px;
        height: 446px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .transactions .empty p {
        font-size: 20px;
        color: #868686;
        text-align: center;
    }
    
    .balance {
        width: calc(100% - 24px);
        position: absolute;
        bottom: 15px;
        left: 15px;
    }
    
    .balance p {
        color: #000;
        font-weight: 700;
        font-size: 17px;
    }
    
    .balance strong {
        color: ${props => props.positive ? "#03AC00" : "#C70000"};
    }
    
    @media (max-height: 850px) {
        height: 300px;
    }
`;

const Transaction = styled.div`
    justify-content: space-between;
    font-size: 16px;
    margin-bottom: 16px;
    
    div:first-child {
        justify-content: flex-start;
    }
    
    div:nth-child(2) {
        width: auto;
        justify-content: flex-end;
    }
    
    div:nth-child(2) span {
        cursor: pointer;
    }
    
    span {
        color: #C6C6C6;
    }
    
    p {
        color: #000000;
        margin: 0 8px;
        cursor: pointer;
    }
    
    strong {
        color: ${props => props.transactionType === "earn" ? "#03AC00" : "#C70000"};
        margin-right: 12px;
    }
`;

const CreateTransaction = styled.div`
    width: 100%;
    max-width: 600px;
    display: flex;
    justify-content: space-between;
    margin-top: 13px;
    
    button {
        background-color: #A328D6;
        width: calc((100% - 15px) / 2);
        height: 114px;
        font-size: 17px;
        font-weight: 700;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        border-radius: 5px;
        padding: 10px;
        cursor: pointer;
    }
    
    ion-icon {
        font-size: 25px;
    }
    
    p {
        text-align: left;
    }
`;

export {ExtractWrapper, ExtractContainer, Transaction, CreateTransaction};