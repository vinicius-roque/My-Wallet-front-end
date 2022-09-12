import { useLocation, useNavigate } from "react-router-dom";
import { createTransaction } from "../../Services/ports";
import { useForm } from "../../Globally/useForm";
import { FormWrapper } from "../../Globally/styles";

export default function TransactionForms({ userData }) {
    const { state } = useLocation();
    const spentOrEarn = state === "earn" ? "entrada" : "saída";
    const config = {
        headers: {
            "Authorization": `Bearer ${userData.token}`
        }
    };
    const [forms, holdForms] = useForm({
        initState: {
            type: state,
            value: "",
            description: "",
        }
    });

    const navigate = useNavigate();

    function sendForm(e) {
        e.preventDefault();
        const promise = createTransaction(
            {
                ...forms,
                date: new Date(),
            },
            config
        );

        promise
        .then(() => navigate('/extract'))
        .catch((error) => {
            const errorStatus = error.response.status;
            switch (errorStatus) {
                case 401:
                    alert('Erro de validação, refaça o login');
                    break;
                case 422:
                    alert(error.response.data.join('\n'));
                    break;
                default:
                    alert('Algo deu errado, tente novamente');
                    break;
            }
        });
    }

    return (
        <FormWrapper centered={false}>
            <h2>Nova {spentOrEarn}</h2>
            <form onSubmit={sendForm}>
                <input
                    type="text"
                    placeholder="Valor"
                    name="value"
                    value={forms.value}
                    onChange={holdForms}
                    required
                ></input>
                <input
                    type="text"
                    placeholder="Descrição"
                    name="description"
                    value={forms.description}
                    onChange={holdForms}
                    required
                ></input>
                <input 
                    type="submit"
                    value={"Salvar " + spentOrEarn}
                ></input>
            </form>
        </FormWrapper>
    )
}