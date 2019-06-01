import React from 'react';
import {User} from '../store/users/types';
import UserListItem from './UserListItem';
import {IonList, IonListHeader} from '@ionic/react';

interface Props {
  users: User[]
  hidden: boolean;
  listType: "all" | "favorites"
}

const UserList: React.FunctionComponent<Props> = ({users, hidden, listType }) => {
  if (users.length === 0) {
    return (
      <IonList style={hidden ? {display: 'none'} : {}}>
        <IonListHeader>
          No Users Found
        </IonListHeader>
      </IonList>
    );
  }

  return (
    <IonList style={hidden ? {display: 'none'} : {}}>
          { users.map((user: User, userIndex: number) => (
            <UserListItem
              key={`${userIndex}`}
              user={user}
              listType={listType}
            />
          ))}
    </IonList>
  );
};

export default UserList;
