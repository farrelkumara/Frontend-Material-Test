import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonText,
} from "@ionic/react";
import { useState } from "react";
import { login } from "../config";
import { useHistory, Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  let history = useHistory();

  // async function Login() {
  //   const res = await login(email, password);
  //   res ? history.push("/Profile") : alert("error");
  // }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await login(data.email, data.password);
    res ? history.push("/Profile") : alert("error");
    // console.log(res);
    // alert(JSON.stringify(data));
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding content">
        <IonText> Email</IonText>
        <IonInput
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "This is not a valid email",
            },
          })}
          // onIonChange={(e: any) => setEmail(e.target.value)}
        />
        <p>{errors.email?.message}</p>
        <IonText> Password</IonText>
        <IonInput
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must have at least 6 characters",
            },
          })}
          // onIonChange={(e: any) => setPassword(e.target.value)}
        />
        <p>{errors.password?.message}</p>
        <IonButton className="btn" onClick={handleSubmit(onSubmit)}>
          Login
        </IonButton>
        <IonText className="register">
          New here? <Link to="/register">Register</Link>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default Login;
