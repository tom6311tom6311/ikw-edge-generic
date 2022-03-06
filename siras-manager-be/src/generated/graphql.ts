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
  site?: Maybe<Site>;
};


export type QuerySiteArgs = {
  siteId: Scalars['ID'];
};

export type Site = {
  __typename?: 'Site';
  addressChin: Scalars['String'];
  addressEng: Scalars['String'];
  area?: Maybe<Scalars['Float']>;
  awardRecordList: Array<Scalars['String']>;
  capacity: Scalars['Float'];
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
  numSiras: Scalars['Int'];
  organization: Scalars['String'];
  ownerNameChin: Scalars['String'];
  ownerNameEng: Scalars['String'];
  ponds: Array<Pond>;
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
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Pond: ResolverTypeWrapper<Pond>;
  Query: ResolverTypeWrapper<{}>;
  Site: ResolverTypeWrapper<Site>;
  SiteStatus: SiteStatus;
  SiteValidationStatus: SiteValidationStatus;
  String: ResolverTypeWrapper<Scalars['String']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Pond: Pond;
  Query: {};
  Site: Site;
  String: Scalars['String'];
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
  site?: Resolver<Maybe<ResolversTypes['Site']>, ParentType, ContextType, RequireFields<QuerySiteArgs, 'siteId'>>;
};

export type SiteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Site'] = ResolversParentTypes['Site']> = {
  addressChin?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  addressEng?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  area?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  awardRecordList?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  capacity?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
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
  numSiras?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  organization?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ownerNameChin?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ownerNameEng?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ponds?: Resolver<Array<ResolversTypes['Pond']>, ParentType, ContextType>;
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

export type Resolvers<ContextType = any> = {
  Pond?: PondResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Site?: SiteResolvers<ContextType>;
};

