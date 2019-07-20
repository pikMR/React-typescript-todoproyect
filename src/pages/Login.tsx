import React, {Component,createRef} from 'react';
import {connect} from 'react-redux';
import { RootState, actions } from '../store';
import {IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenuButton, IonPopover, IonTitle, IonToolbar} from '@ionic/react';
import './Login.css';
import LoginPopover from '../components/LoginPopover';
import { IonInput, IonItem, IonLabel,IonToast, IonRow, IonCol, IonAlert, IonModal,IonImg } from '@ionic/react';
import { Account } from '../store/account/types';
import {RouteComponentProps} from 'react-router';
import Auth from '../components/Auth';

//type Props = RouteComponentProps & ReturnType<typeof mapStateToProps>;
type Props = RouteComponentProps<{}> & typeof mapDispatchToProps & ReturnType<typeof mapStateToProps>;

type State = {
    isLogin: boolean,
    showAlert: boolean,
    showModal: boolean,
    message: string,
    name : string,
    password: string,
    admin: boolean
}

class Login extends Component<Props,State> {
  private refMail = createRef<HTMLInputElement>();
  private refPassword = createRef<HTMLInputElement>();

  constructor(props: Props) {
      super(props);

      var _cuentas = props.updateAccounts();

      this.state = {
          isLogin: false,
          showAlert : false,
          showModal: false,
          message: "",
          name: "",
          password: "",
          admin: false
      }
  }

  publicar = () => {
    var currentmail = this.refMail.current;
    var currentpass = this.refPassword.current;

    if(currentmail && currentpass){
      let mailmessage : string = this.validateEmail(currentmail.value);
      let passmessage : string = this.validatePass(currentpass.value);
      let okmessage : boolean = (mailmessage=="");
      let okpass : boolean = (passmessage=="");
      var message = !okmessage ? mailmessage : !okpass ? passmessage : "";
      let authlogin : boolean = false;

      if(okpass && okmessage){
        //let = this.props.accounts;

      }

      this.setState(() => ({
          message : message,
          showModal : (okpass && okmessage),
          showAlert : (!okpass || !okmessage), // uno de los 2 contiene un mensaje de error
          isLogin : (okpass && okmessage) // los 2 condicinales nos dan ok
      }));
    }else{
      this.setState(() => ({
          message : "Ha ocurrido un error inesperado.",
          showModal : false,
          showAlert : true,
          isLogin : false
      }));
    }

  }

  validateEmail = (email : string) => {
    if (email) {
        if (/[a-z]+@[a-z]+\.[a-z]+/.test(email)) {
            return "";
        } else {
            return "Invalid email";
        }
    } else {
        return "Email required";
    }
}

validatePass = (pass:string) => {
    if (pass) {
        if (pass.length < 6) {
            return 'At least 6 characters required';
        } else {
            return "";
        }
    } else {
        return 'Password required';
    }
}

    render() {
        return (
            <>

                <IonAlert
  isOpen={this.state.showAlert}
  onDidDismiss={() => this.setState(() => ({ showAlert: false }))}
  header={'Alert'}
  subHeader={'Acceso incorrecto'}
  message={this.state.message}
  buttons={['OK']}
>
</IonAlert>
    <IonModal
        isOpen={this.state.showModal}
        onDidDismiss={() => this.setState(() => ({ showModal: false }))}
      >

      <div className="centerModal">
      <IonRow align-items-end>
      <IonCol>
          <IonButton expand="block" fill="outline">Fichar</IonButton>
      </IonCol>
      <IonCol>
          <IonButton expand="block" fill="outline">Ver Usuarios</IonButton>
      </IonCol>
      <IonCol align-self-start>
      </IonCol>
      <IonCol>
          <IonButton expand="block" fill="outline">Ver Tareas</IonButton>
      </IonCol>
      <IonCol>
      	<Auth ultimoElemento={this.props.accounts[this.props.accounts.length-1]} />
      </IonCol>
    </IonRow>
    </div>


        <IonButton onClick={() => this.setState(() => ({ showModal: false }))}>
          Close Modal
        </IonButton>
  </IonModal>
                <IonContent>
                    <IonRow>
                      <IonCol align-self-center>
                        <img src={process.env.PUBLIC_URL + "/assets/img/icons-check.png"} />
                      </IonCol>
                    </IonRow>
                    <input
                      ref={this.refMail}
                      type="text"
                      name="name"
                      placeholder="Correo"
                      className="inpution"
                      />

                    <input
                      ref={this.refPassword}
                      type="password"
                      name="password"
                      placeholder="Contraseña"
                      className="inpution"
                      />

                    <IonButton size="large" expand="block" fill="outline" onClick={this.publicar}>Autenticación</IonButton>

                    <div className="ion-padding login-info">
                        <h4>Steve's User Emporium</h4>

                        <p>
                            We are specialists in Freshwater Tropical and Tropical Marine. We are also suppliers of pond products, aquariums and viviariums.
                            <br/> <br/>
                            We are one of the largest aquatic emporiums in London, and we pride our selves in 1 to 1 service and try to give the best possible advice to each customer
                            from beginner to experienced. We will always give a warm and friendly welcome to anyone who walks through the door!
                            <br/> <br/>
                            Please come to one of our tasks to view our vast array of tropical and marine livestock.
                            We house a large selection of tropical and marine User including a large selection of corals and invertebrates and freshwater User.
                        </p>
                    </div>
                </IonContent>
            </>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
  accounts: state.account.accounts
});

const mapDispatchToProps = {
  // actions.account se debe referenciar en el index.ts !!
  updateAccounts: () => actions.account.updateAccounts()
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
