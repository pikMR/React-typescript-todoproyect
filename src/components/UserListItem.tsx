import React from 'react';
import { connect } from 'react-redux';
import { RootState, actions } from '../store';
import { withRouter, RouteComponentProps } from 'react-router';
import {IonLabel, IonItemSliding, IonItem, IonItemOptions, IonItemOption, IonAlert, IonAvatar} from '@ionic/react';
import { User } from '../store/users/types';
import { AlertButton } from '@ionic/react';

type Props = RouteComponentProps<{}> & typeof mapDispatchToProps & ReturnType<typeof mapStateToProps> & {
  user: User;
  listType: "all" | "favorites";
}

type State = {
  showAlert: boolean;
  alertHeader?: string;
  alertMessage?: string;
  alertButtons: (AlertButton | string)[];
}

class UserListItem extends React.Component<Props, State> {
  ionItemSlidingRef: React.RefObject<any>;
  defaultState: State = {
    showAlert: false,
    alertHeader: '',
    alertMessage: undefined,
    alertButtons: []
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      ...this.defaultState
    };
    this.ionItemSlidingRef = React.createRef();
  }

  dismissAlert = () => {
    this.setState(() => ({
      ...this.defaultState
    }));
    if (this.ionItemSlidingRef.current) this.ionItemSlidingRef.current.close();
  }

  addFavoriteUser = () => {
    if (this.props.favoriteUsers.indexOf(this.props.user.id) !== - 1) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      this.removeFavoriteUser('Favorite already added')();
    } else {
      // remember this user as a user favorite
      this.props.addFavorite(this.props.user.id);

      // create an alert instance
      this.setState({
        showAlert: true,
        alertHeader: 'Favorite Added',
        alertButtons: [
          {
            text: 'OK',
            handler: this.dismissAlert
          }
        ]
      });
    }
  }

  removeFavoriteUser = (title: string) => () => {
    this.setState({
      showAlert: true,
      alertHeader: title,
      alertMessage: 'Would you like to remove this user from your favorites?',
      alertButtons: [
        {
          text: 'Cancel',
          handler: this.dismissAlert
        },
        {
          text: 'Remove',
          handler: () => {
            this.props.removeFavorite(this.props.user.id);
            this.dismissAlert();
          }
        }
      ]
    });
  }

  navigateToUser = (userId: number) => () => {
    this.props.history.push(`/users/users/${userId}`);
  }

  render() {
    return (
      <IonItemSliding ref={this.ionItemSlidingRef} class={'track-' + this.props.user.tags[0].toLowerCase()}>
        <IonAlert
          isOpen={this.state.showAlert}
          header={this.state.alertHeader}
          buttons={this.state.alertButtons}
          onDidDismiss={this.dismissAlert}
        ></IonAlert>
        <IonItem button onClick={this.navigateToUser(this.props.user.id)}>
          <IonAvatar slot="start">
            <img src={process.env.PUBLIC_URL + this.props.user.pic} alt={this.props.user.name}/>
          </IonAvatar>
          <IonLabel>
            <h3>{this.props.user.name}</h3>
          </IonLabel>
        </IonItem>
        <IonItemOptions>
          { this.props.listType === "favorites" ?
            <IonItemOption color="danger" onClick={this.removeFavoriteUser('Remove Favorite')}>
              Remove
            </IonItemOption>
            :
            <IonItemOption color="favorite" onClick={this.addFavoriteUser}>
              Favorite
            </IonItemOption>
          }
        </IonItemOptions>
      </IonItemSliding>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  favoriteUsers: state.users.favoriteUsers
});

const mapDispatchToProps = {
  addFavorite: (userId: number) => actions.users.addFavorite(userId),
  removeFavorite: (userId: number) => actions.users.removeFavorite(userId),
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(UserListItem));
