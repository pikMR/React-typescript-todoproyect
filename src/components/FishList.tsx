import React from 'react';
import {Fish} from '../store/fishes/types';
import FishListItem from './FishListItem';
import {IonList, IonListHeader} from '@ionic/react';

interface Props {
  users: Fish[]
  hidden: boolean;
  listType: "all" | "favorites"
}

const FishList: React.FunctionComponent<Props> = ({users, hidden, listType }) => {
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
          { users.map((user: Fish, fishIndex: number) => (
            <FishListItem
              key={`${fishIndex}`}
              fish={user}
              listType={listType}
            />
          ))}
    </IonList>
  );
};

export default FishList;
