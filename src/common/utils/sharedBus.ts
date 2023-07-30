import { SharedBusService } from '../services';

type SharedBusMethods = {
  signOut: () => void;
  signedInRedirect: () => void;
};

const sharedBus = new SharedBusService<SharedBusMethods>();

export { sharedBus };
