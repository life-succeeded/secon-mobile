import React from 'react';
import { IonReactRouter as OriginalIonReactRouter } from '@ionic/react-router';

type IonReactRouterProps = React.ComponentProps<typeof OriginalIonReactRouter>;

const IonReactRouterWrapper: React.FC<React.PropsWithChildren<IonReactRouterProps>> = (props) => {
  return <OriginalIonReactRouter {...props} />;
};

export default IonReactRouterWrapper;
