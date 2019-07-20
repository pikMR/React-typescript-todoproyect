import React from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {RootState} from '../store';
import {IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar} from '@ionic/react';
import { Account } from '../store/account/types'

type ItemProps = {
  ultimoElemento: Account;
}

const Auth = (ultimoElemento : ItemProps) => {

  let _ultimo = ultimoElemento;
  if (_ultimo.ultimoElemento == undefined) {
    return (<></>);
  }

  let correo = _ultimo.ultimoElemento.correo;
  let esAdmin = "es_" + _ultimo.ultimoElemento.rol;

  return (
      <IonHeader>
        <IonToolbar>
          <IonTitle>{correo}</IonTitle>
          <h4>{esAdmin}</h4>
        </IonToolbar>
      </IonHeader>
  );
}

export default Auth;
