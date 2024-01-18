export enum Route {
  Schedule = "ScheduleScreen",
  Login = "Login",
  Main = "Main",
  HomeStack = "HomeStack",
  Home = "Home",
  Details = "Details",
}

export type RootStackParamList = {
  [Route.Login]: undefined;

  [Route.Main]: undefined;
  [Route.Home]: undefined;
  [Route.Details]: { vehicleId: string };
};

export type ScheduleStackParamList = {
  [Route.Schedule]: undefined;
};
