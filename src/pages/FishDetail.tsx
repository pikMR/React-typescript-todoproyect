import React from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {RootState} from '../store';
import {IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar} from '@ionic/react';
import './FishDetail.css';

type Props = RouteComponentProps<{ id: string, tab: string }> & ReturnType<typeof mapStateToProps> & {
  goBack: () => void
};

const FishDetail: React.FC<Props> = ({ users, branches, match, goBack }) => {
  const user = users.find(f => f.id === parseInt(match.params.id, 10));
  if (user == null) {
    return null;
  }
  const fishBranches = branches.filter(b => user.branchIds.indexOf(b.id) !== -1);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton goBack={goBack} defaultHref={`/${match.params.tab}`} />
          </IonButtons>
          <IonTitle>{user.name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent padding class="fish-detail">
        <div className="ion-text-center">
             <img src={user.pic} alt={user.pic}/>
        </div>
        <div>
          <p>{user.description}</p>

          <p className='branches-list-title'>Found at these branches:</p>

          {fishBranches.map(branch => (
            <h4 key={branch.name}>
              {branch.name}
            </h4>
          ))}

        </div>
      </IonContent>
    </>
  );
}

const mapStateToProps = (state: RootState) => ({
  users: state.users.users,
  branches: state.branches.branches
});

export default connect(
  mapStateToProps
)(FishDetail)
