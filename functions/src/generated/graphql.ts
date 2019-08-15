import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type AuthPayload = {
  __typename?: 'AuthPayload',
  token?: Maybe<Scalars['String']>,
  user?: Maybe<User>,
  error?: Maybe<Scalars['String']>,
};

export type Family = {
  __typename?: 'Family',
  id: Scalars['ID'],
  name: Scalars['String'],
  imageUrl?: Maybe<Scalars['String']>,
  numMembers: Scalars['Int'],
  numArtifacts: Scalars['Int'],
  createdAt: Scalars['String'],
};

export type Mutation = {
  __typename?: 'Mutation',
  signup?: Maybe<AuthPayload>,
};


export type MutationSignupArgs = {
  input: UserSignupInput
};

export type Query = {
  __typename?: 'Query',
  me: Scalars['String'],
  user?: Maybe<Scalars['String']>,
};


export type QueryUserArgs = {
  id: Scalars['ID']
};

export type User = {
  __typename?: 'User',
  id: Scalars['ID'],
  username: Scalars['String'],
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  imageUrl?: Maybe<Scalars['String']>,
  location?: Maybe<Scalars['String']>,
  dateOfBirth?: Maybe<Scalars['String']>,
  gender?: Maybe<Scalars['String']>,
  families?: Maybe<Array<Family>>,
  createdAt: Scalars['String'],
  lastLogin?: Maybe<Scalars['String']>,
};

export type UserSignupInput = {
  email: Scalars['String'],
  password: Scalars['String'],
  confirmPassword: Scalars['String'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
};


export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>;
}

export type SubscriptionResolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

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
  Query: ResolverTypeWrapper<{}>,
  String: ResolverTypeWrapper<Scalars['String']>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Mutation: ResolverTypeWrapper<{}>,
  UserSignupInput: UserSignupInput,
  AuthPayload: ResolverTypeWrapper<AuthPayload>,
  User: ResolverTypeWrapper<User>,
  Family: ResolverTypeWrapper<Family>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  String: Scalars['String'],
  ID: Scalars['ID'],
  Mutation: {},
  UserSignupInput: UserSignupInput,
  AuthPayload: AuthPayload,
  User: User,
  Family: Family,
  Int: Scalars['Int'],
  Boolean: Scalars['Boolean'],
};

export type AuthPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type FamilyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Family'] = ResolversParentTypes['Family']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  numMembers?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  numArtifacts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  signup?: Resolver<Maybe<ResolversTypes['AuthPayload']>, ParentType, ContextType, MutationSignupArgs>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  me?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, QueryUserArgs>,
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  dateOfBirth?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  gender?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  families?: Resolver<Maybe<Array<ResolversTypes['Family']>>, ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  lastLogin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type Resolvers<ContextType = any> = {
  AuthPayload?: AuthPayloadResolvers<ContextType>,
  Family?: FamilyResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
