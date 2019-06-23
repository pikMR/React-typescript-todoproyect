import React from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {RootState} from '../store';
import {IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar} from '@ionic/react';
import { Account } from '../store/account/types'

type Props = RouteComponentProps<{}> & ReturnType<typeof mapStateToProps> & {
  id: string;
}

const Auth: React.FC<Props> = (account) => {
  if (account == null) {
    return null;
  }

  let isAdmin = (account.id === "1");
  let esAdmin = isAdmin ? " es admin" : " no es admin";
  //const userTasks = tasks.filter(b => user.taskIds.indexOf(b.id) !== -1);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{account.id} </IonTitle>
          <h4>{esAdmin}</h4>
        </IonToolbar>
      </IonHeader>
    </>
  );
}

const mapStateToProps = (state: RootState) => ({
  account: state.account.account
});

export default connect(
  mapStateToProps
)(Auth)
