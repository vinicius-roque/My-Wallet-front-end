import { useNavigate } from "react-router-dom";
import { FormWrapper } from "../../Globally/styles";
import { useForm } from "../../Globally/useForm";
import { registerUser } from "../../Services/ports";

export default function SignUp() {
    const [form, handleForm] = useForm({
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
        const promise = registerUser(form);
        
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
                    value={form.name}
                    onChange={handleForm}
                    required
                ></input>
                <input
                    type="email"
                    placeholder="E-mail"
                    name="email"
                    value={form.email}
                    onChange={handleForm}
                    required
                ></input>
                <input
                    type="password"
                    placeholder="Senha"
                    name="password"
                    value={form.password}
                    onChange={handleForm}
                    required
                ></input>
                <input
                    type="password"
                    placeholder="Confirme a senha"
                    name="passwordConfirmation"
                    value={form.passwordConfirmation}
                    onChange={handleForm}
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
