import styled from "styled-components";

const AppWrapper = styled.main`
    background-color: #8C11BE;
    min-width: 100vw;
    width: 100%;
    min-height: 100vh;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 25px 24px 16px 24px;
`;

const FormWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: ${props => props.centered ? 0 : "auto"};
    
    h1 {
        font-family: 'Saira Stencil One', cursive;
        color: #FFFFFF;
        font-size: 32px;
        margin-bottom: 40px;
    }
    
    h2 {
        width: 100%;
        font-size: 26px;
        font-weight: 700;
        margin-bottom: 40px;
    }
    
    form {
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
    
    input {
        background-color: #FFFFFF;
        color: #000000;
        width: 326px;
        height: 58px;
        font-size: 20px;
        border-radius: 5px;
        padding-left: 15px;
        margin-bottom: 13px;
        border: none;
    }
    
    input::placeholder {
        color: #000000;
        font-size: 20px;
    }
    
    input[type="submit"] {
        background-color: #A328D6;
        color: #FFFFFF;
        font-weight: 700;
        cursor: pointer;
    }
    
    p {
        font-weight: 700;
        font-size: 15px;
        margin-top: 25px;
        cursor: pointer;
    }
`;

export { AppWrapper, FormWrapper };


