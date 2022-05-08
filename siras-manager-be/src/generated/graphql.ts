import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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


export type QuerySitesArgs = {
  siteIds: Array<Scalars['ID']>;
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Device: ResolverTypeWrapper<Device>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Op: ResolverTypeWrapper<Op>;
  Pond: ResolverTypeWrapper<Pond>;
  Query: ResolverTypeWrapper<{}>;
  SensorData: ResolverTypeWrapper<SensorData>;
  Siras: ResolverTypeWrapper<Siras>;
  SirasStatus: SirasStatus;
  Site: ResolverTypeWrapper<Site>;
  SiteStatus: SiteStatus;
  SiteValidationStatus: SiteValidationStatus;
  String: ResolverTypeWrapper<Scalars['String']>;
  Threshold: ResolverTypeWrapper<Threshold>;
  TimeSeriesDataPoint: ResolverTypeWrapper<TimeSeriesDataPoint>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Device: Device;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  Op: Op;
  Pond: Pond;
  Query: {};
  SensorData: SensorData;
  Siras: Siras;
  Site: Site;
  String: Scalars['String'];
  Threshold: Threshold;
  TimeSeriesDataPoint: TimeSeriesDataPoint;
  User: User;
};

export type DeviceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Device'] = ResolversParentTypes['Device']> = {
  deviceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  opIds?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  login?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  logout?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
};

export type OpResolvers<ContextType = any, ParentType extends ResolversParentTypes['Op'] = ResolversParentTypes['Op']> = {
  defaultWarningThreshold?: Resolver<Maybe<ResolversTypes['Threshold']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  opId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sensorName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  unit?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PondResolvers<ContextType = any, ParentType extends ResolversParentTypes['Pond'] = ResolversParentTypes['Pond']> = {
  administrativeNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  area?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  landSerialNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  serialNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  typeCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  op?: Resolver<Maybe<ResolversTypes['Op']>, ParentType, ContextType, RequireFields<QueryOpArgs, 'opId'>>;
  ops?: Resolver<Array<ResolversTypes['Op']>, ParentType, ContextType, RequireFields<QueryOpsArgs, 'opIds'>>;
  sensorData?: Resolver<Array<ResolversTypes['SensorData']>, ParentType, ContextType, RequireFields<QuerySensorDataArgs, 'aggregateWindow' | 'deviceId' | 'opIds' | 'timeEnd' | 'timeStart'>>;
  siras?: Resolver<Maybe<ResolversTypes['Siras']>, ParentType, ContextType, RequireFields<QuerySirasArgs, 'sirasId'>>;
  sirases?: Resolver<Array<ResolversTypes['Siras']>, ParentType, ContextType, RequireFields<QuerySirasesArgs, 'sirasIds'>>;
  site?: Resolver<Maybe<ResolversTypes['Site']>, ParentType, ContextType, RequireFields<QuerySiteArgs, 'siteId'>>;
  sites?: Resolver<Array<ResolversTypes['Site']>, ParentType, ContextType, RequireFields<QuerySitesArgs, 'siteIds'>>;
};

export type SensorDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['SensorData'] = ResolversParentTypes['SensorData']> = {
  deviceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  opId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timeSeries?: Resolver<Array<ResolversTypes['TimeSeriesDataPoint']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SirasResolvers<ContextType = any, ParentType extends ResolversParentTypes['Siras'] = ResolversParentTypes['Siras']> = {
  capacity?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  devices?: Resolver<Array<ResolversTypes['Device']>, ParentType, ContextType>;
  sirasId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  speciesList?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['SirasStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SiteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Site'] = ResolversParentTypes['Site']> = {
  addressChin?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  addressEng?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  area?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  awardRecordList?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  capacity?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  centralDevice?: Resolver<Maybe<ResolversTypes['Device']>, ParentType, ContextType>;
  companyNameChin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  companyNameEng?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  county?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  district?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  licenseNum?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nameChin?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nameEng?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  numEmployees?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  organization?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  ponds?: Resolver<Array<ResolversTypes['Pond']>, ParentType, ContextType>;
  sirasIds?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>;
  siteId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  speciesList?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['SiteStatus'], ParentType, ContextType>;
  telCompany?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  telHouse?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  telMobile?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  trademark?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  validationStatus?: Resolver<ResolversTypes['SiteValidationStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThresholdResolvers<ContextType = any, ParentType extends ResolversParentTypes['Threshold'] = ResolversParentTypes['Threshold']> = {
  high?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  low?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TimeSeriesDataPointResolvers<ContextType = any, ParentType extends ResolversParentTypes['TimeSeriesDataPoint'] = ResolversParentTypes['TimeSeriesDataPoint']> = {
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nameChin?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nameEng?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Device?: DeviceResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Op?: OpResolvers<ContextType>;
  Pond?: PondResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SensorData?: SensorDataResolvers<ContextType>;
  Siras?: SirasResolvers<ContextType>;
  Site?: SiteResolvers<ContextType>;
  Threshold?: ThresholdResolvers<ContextType>;
  TimeSeriesDataPoint?: TimeSeriesDataPointResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

