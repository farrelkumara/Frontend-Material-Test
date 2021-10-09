import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { useState } from "react";
import auth from "../config";
import { updateData } from "../config";
import { useHistory } from "react-router-dom";
import { getData } from "../config";

const Profile: React.FC = () => {
  const [disable, setDisable] = useState(true);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  //   const [user, setUser] = useState({ name: "", birthdate: "" });
  const [nama, setNama] = useState("");
  const [birth, setBirth] = useState("");
  let history = useHistory();
  getData(auth.currentUser?.uid).then((data) => {
    setNama(data.name);
    setBirth(data.birthdate);
  });
  console.log(nama);

  function updateProfile() {
    setDisable(false);
    setShow(true);
    console.log(nama);
  }

  function saveProfile() {
    setDisable(true);
    setShow(false);
    updateData(auth.currentUser?.uid, name, birthdate);
  }

  function logout() {
    auth.signOut();
    history.push("/");
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow className="ion-align-items-center">
            <IonCol size="3">
              <IonText>Email :</IonText>
            </IonCol>
            <IonCol>
              <IonInput value={auth.currentUser?.email} disabled={true} />
            </IonCol>
          </IonRow>
          <IonRow className="ion-align-items-center">
            <IonCol size="3">
              <IonText>Nama :</IonText>
            </IonCol>
            <IonCol>
              <IonInput
                disabled={disable}
                placeholder={nama}
                onIonChange={(e: any) => setName(e.target.value)}
              />
            </IonCol>
          </IonRow>
          <IonRow className="ion-align-items-center">
            <IonCol size="3">
              <IonText>Birthdate :</IonText>
            </IonCol>
            <IonCol>
              <IonInput
                disabled={disable}
                placeholder={birth}
                onIonChange={(e: any) => setBirthdate(e.target.value)}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
        {show ? (
          <IonButton onClick={saveProfile}>Save</IonButton>
        ) : (
          <IonButton onClick={updateProfile}>Update Profile</IonButton>
        )}
        <IonButton color="danger" onClick={logout}>
          Logout
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
