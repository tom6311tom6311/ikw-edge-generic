export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Device = {
  __typename?: 'Device';
  deviceId: Scalars['String'];
  opIds: Array<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<Scalars['String']>;
  logout?: Maybe<Scalars['Boolean']>;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Op = {
  __typename?: 'Op';
  defaultWarningThreshold?: Maybe<Threshold>;
  name: Scalars['String'];
  opId: Scalars['Int'];
  sensorName?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
};

export type Pond = {
  __typename?: 'Pond';
  administrativeNumber?: Maybe<Scalars['String']>;
  area: Scalars['Float'];
  landSerialNumber?: Maybe<Scalars['String']>;
  serialNumber: Scalars['String'];
  typeCode?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  op?: Maybe<Op>;
  ops: Array<Op>;
  sensorData: Array<SensorData>;
  siras?: Maybe<Siras>;
  sirases: Array<Siras>;
  site?: Maybe<Site>;
  sites: Array<Site>;
};


export type QueryOpArgs = {
  opId: Scalars['Int'];
};


export type QueryOpsArgs = {
  opIds: Array<Scalars['Int']>;
};


export type QuerySensorDataArgs = {
  aggregateWindow: Scalars['String'];
  deviceId: Scalars['String'];
  opIds: Array<Scalars['Int']>;
  timeEnd: Scalars['Int'];
  timeStart: Scalars['Int'];
};


export type QuerySirasArgs = {
  sirasId: Scalars['ID'];
};


export type QuerySirasesArgs = {
  sirasIds: Array<Scalars['ID']>;
};


export type QuerySiteArgs = {
  siteId: Scalars['ID'];
};

export type SensorData = {
  __typename?: 'SensorData';
  deviceId: Scalars['String'];
  opId: Scalars['Int'];
  timeSeries: Array<TimeSeriesDataPoint>;
};

export type Siras = {
  __typename?: 'Siras';
  capacity: Scalars['Float'];
  devices: Array<Device>;
  sirasId: Scalars['ID'];
  speciesList: Array<Scalars['String']>;
  status: SirasStatus;
};

export enum SirasStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export type Site = {
  __typename?: 'Site';
  addressChin: Scalars['String'];
  addressEng: Scalars['String'];
  area?: Maybe<Scalars['Float']>;
  awardRecordList: Array<Scalars['String']>;
  capacity: Scalars['Float'];
  centralDevice?: Maybe<Device>;
  companyNameChin?: Maybe<Scalars['String']>;
  companyNameEng?: Maybe<Scalars['String']>;
  county: Scalars['String'];
  district: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  licenseNum?: Maybe<Scalars['String']>;
  nameChin: Scalars['String'];
  nameEng: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  numEmployees?: Maybe<Scalars['Int']>;
  organization: Scalars['String'];
  owner?: Maybe<User>;
  ponds: Array<Pond>;
  sirasIds: Array<Scalars['ID']>;
  siteId: Scalars['ID'];
  speciesList: Array<Scalars['String']>;
  status: SiteStatus;
  telCompany?: Maybe<Scalars['String']>;
  telHouse?: Maybe<Scalars['String']>;
  telMobile?: Maybe<Scalars['String']>;
  trademark?: Maybe<Scalars['String']>;
  validationStatus: SiteValidationStatus;
};

export enum SiteStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export enum SiteValidationStatus {
  New = 'NEW',
  Passed = 'PASSED',
  Rejected = 'REJECTED',
  UnderReview = 'UNDER_REVIEW'
}

export type Threshold = {
  __typename?: 'Threshold';
  high?: Maybe<Scalars['Float']>;
  low?: Maybe<Scalars['Float']>;
};

export type TimeSeriesDataPoint = {
  __typename?: 'TimeSeriesDataPoint';
  timestamp: Scalars['Int'];
  value: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  nameChin: Scalars['String'];
  nameEng: Scalars['String'];
};
