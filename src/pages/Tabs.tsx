import React, { Component } from 'react';
import { IonIcon, IonTabs, IonTab, IonTabBar, IonTabButton, IonLabel } from '@ionic/react';

export default class Tabs extends Component {
  render() {
    return (
      <IonTabs>
        <IonTab tab="users">User Content</IonTab>
        <IonTab tab="branches">Branches Content</IonTab>
        <IonTab tab="map">Map Content</IonTab>
        <IonTab tab="about">About Content</IonTab>

        <IonTabBar slot="bottom">
        <IonTabButton tab="login">
          <IonLabel>Acceso</IonLabel>
          <IonIcon name="login"></IonIcon>
        </IonTabButton>
          <IonTabButton tab="users">
            <IonLabel>Usuarios</IonLabel>
            <IonIcon name="users"></IonIcon>
          </IonTabButton>
          <IonTabButton tab="branches">
            <IonLabel>Mi Perfil</IonLabel>
            <IonIcon name="branches"></IonIcon>
          </IonTabButton>
          <IonTabButton tab="map">
            <IonLabel>Mapa</IonLabel>
            <IonIcon name="map"></IonIcon>
          </IonTabButton>

        </IonTabBar>
      </IonTabs>
    );
  }
}
