import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Automatically navigate to the dashboard without login
        navigate("/dashboard");
    }, [navigate]);

    // Nothing to render
    return null;
};

export default SignIn;
