import { useNavigate } from "react-router-dom";
import { FormWrapper } from "../../Globally/styles";
import { useForm } from "../../Globally/useForm";
import { registerUser } from "../../Services/ports";

export default function SignUp() {
    const [forms, holdForms] = useForm({
        initState: {
            name: "",
            email: "",
            password: "",
            passwordConfirmation: "",
        }
    });
    const navigate = useNavigate();

    function sendForm(e) {
        e.preventDefault();
        const promise = registerUser(forms);
        
        promise
        .then(() => navigate('/'))
        .catch(error => {
            const errorStatus = error.response.status;
            switch (errorStatus) {
                case 422:
                    const errorsArray = error.response.data;
                    if (errorsArray.includes("\"passwordConfirmation\" must be [ref:password]")) {
                        const index = errorsArray.indexOf("\"passwordConfirmation\" must be [ref:password]");
                        errorsArray[index] = "both passwords must be equal";
                    }
        
                    alert(errorsArray.join('\n'));
                    break;

                case 409:
                    alert('E-mail já cadastrado, tente outro email.');
                    break;

                default:
                    alert('Algo deu errado, tente novamente');
                    break;
            }
        });
    }

    return (
        <FormWrapper centered={true}>
            <h1>MyWallet</h1>
            <form onSubmit={sendForm}>
                <input
                    type="text"
                    placeholder="Nome"
                    name="name"
                    value={forms.name}
                    onChange={holdForms}
                    required
                ></input>
                <input
                    type="email"
                    placeholder="E-mail"
                    name="email"
                    value={forms.email}
                    onChange={holdForms}
                    required
                ></input>
                <input
                    type="password"
                    placeholder="Senha"
                    name="password"
                    value={forms.password}
                    onChange={holdForms}
                    required
                ></input>
                <input
                    type="password"
                    placeholder="Confirme a senha"
                    name="passwordConfirmation"
                    value={forms.passwordConfirmation}
                    onChange={holdForms}
                    required
                ></input>
                <input 
                    type="submit"
                    value="Cadastrar" 
                    required
                ></input>
            </form>
            <p onClick={() => navigate('/')}>Já tem uma conta? Entre agora!</p>
        </FormWrapper>
    )
}
