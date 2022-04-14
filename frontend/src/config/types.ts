export type Answer = {
  _id: string;
  title: string;
  questionId: string;
};

export type Question = {
  _id: string;
  title: string;
};

export type QuestionAndAnswers = {
  sessionId: string;
  answers: Answer[];
  questions: Question;
};


export type CurrentUserType = {
  username: string | null;
};

export type ErrorType = {
  response: {
    data: {
      message: string;
    };
  };
};

export type CustomerType = {
  id?: string;
  firstName: string;
  lastName: string;
  secondName: string;
  phone: string;
  email: string;
  address: string;
};
export type ReportType = {
  id: string;
  number: string;
  createdDate: string;
  constructionObjectAddress: string;
  stateName?: string;
};

export type OpeningsType = {
  type: string;
  height: string;
  width: string;
};

export type CalcType = {
  amountFloor: number;
  floorHeight: string;
  floorNumber: number;
  perimeterOfExternalWalls: string;
  baseArea: string;
  externalWallThickness: string;
  internalWallLength: string;
  internalWallThickness: string;
  openings: OpeningsType[];
  amounts: string[];
  osbExternalWall: string;
  steamWaterproofingExternalWall: string;
  windscreenExternalWall: string;
  insulationExternalWall: string;
  osbInternalWall: string;
  overlapThickness: string;
  osbOverlap: string;
  steamWaterproofingOverlap: string;
  windscreenOverlap: string;
  insulationOverlap: string;
};

export type CalcFormType = {
  items: CalcType[];
};
