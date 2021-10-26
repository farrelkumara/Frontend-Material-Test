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
import { Link, useHistory } from "react-router-dom";
import { regis } from "../config";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
  confirm: string;
};

const Register: React.FC = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirm, setConfirm] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  let history = useHistory();

  // async function Register() {
  //   const res = await register(email, password, confirm);
  //   res ? history.push("/") : alert("error");
  // }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await regis(data.email, data.password, data.confirm);
    res ? history.push("/") : alert("error");
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonInput
          placeholder="Email"
          {...register("email", { required: true })}
          //onIonChange={(e: any) => setEmail(e.target.value)}
        />
        {errors.email && <p>Email must be filled out</p>}
        <IonInput
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
          //onIonChange={(e: any) => setPassword(e.target.value)}
        />
        {errors.password && <p>Password must be filled out</p>}
        <IonInput
          type="password"
          placeholder="Confirm Password"
          {...register("confirm", { required: true })}
          //onIonChange={(e: any) => setConfirm(e.target.value)}
        />
        {errors.confirm && <p>Confirm Password must be filled out</p>}
        <IonButton className="btn" onClick={handleSubmit(onSubmit)}>
          Register
        </IonButton>

        <IonText>
          Already have an account? <Link to="/">Login</Link>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default Register;
