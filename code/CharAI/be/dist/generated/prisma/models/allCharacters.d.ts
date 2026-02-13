import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model allCharacters
 *
 */
export type allCharactersModel = runtime.Types.Result.DefaultSelection<Prisma.$allCharactersPayload>;
export type AggregateAllCharacters = {
    _count: AllCharactersCountAggregateOutputType | null;
    _min: AllCharactersMinAggregateOutputType | null;
    _max: AllCharactersMaxAggregateOutputType | null;
};
export type AllCharactersMinAggregateOutputType = {
    id: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type AllCharactersMaxAggregateOutputType = {
    id: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type AllCharactersCountAggregateOutputType = {
    id: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type AllCharactersMinAggregateInputType = {
    id?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type AllCharactersMaxAggregateInputType = {
    id?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type AllCharactersCountAggregateInputType = {
    id?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type AllCharactersAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which allCharacters to aggregate.
     */
    where?: Prisma.allCharactersWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of allCharacters to fetch.
     */
    orderBy?: Prisma.allCharactersOrderByWithRelationInput | Prisma.allCharactersOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.allCharactersWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` allCharacters from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` allCharacters.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned allCharacters
    **/
    _count?: true | AllCharactersCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: AllCharactersMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: AllCharactersMaxAggregateInputType;
};
export type GetAllCharactersAggregateType<T extends AllCharactersAggregateArgs> = {
    [P in keyof T & keyof AggregateAllCharacters]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAllCharacters[P]> : Prisma.GetScalarType<T[P], AggregateAllCharacters[P]>;
};
export type allCharactersGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.allCharactersWhereInput;
    orderBy?: Prisma.allCharactersOrderByWithAggregationInput | Prisma.allCharactersOrderByWithAggregationInput[];
    by: Prisma.AllCharactersScalarFieldEnum[] | Prisma.AllCharactersScalarFieldEnum;
    having?: Prisma.allCharactersScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AllCharactersCountAggregateInputType | true;
    _min?: AllCharactersMinAggregateInputType;
    _max?: AllCharactersMaxAggregateInputType;
};
export type AllCharactersGroupByOutputType = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    _count: AllCharactersCountAggregateOutputType | null;
    _min: AllCharactersMinAggregateOutputType | null;
    _max: AllCharactersMaxAggregateOutputType | null;
};
type GetAllCharactersGroupByPayload<T extends allCharactersGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AllCharactersGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AllCharactersGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AllCharactersGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AllCharactersGroupByOutputType[P]>;
}>>;
export type allCharactersWhereInput = {
    AND?: Prisma.allCharactersWhereInput | Prisma.allCharactersWhereInput[];
    OR?: Prisma.allCharactersWhereInput[];
    NOT?: Prisma.allCharactersWhereInput | Prisma.allCharactersWhereInput[];
    id?: Prisma.StringFilter<"allCharacters"> | string;
    createdAt?: Prisma.DateTimeFilter<"allCharacters"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"allCharacters"> | Date | string;
    characters?: Prisma.CharacterListRelationFilter;
};
export type allCharactersOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    characters?: Prisma.CharacterOrderByRelationAggregateInput;
};
export type allCharactersWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.allCharactersWhereInput | Prisma.allCharactersWhereInput[];
    OR?: Prisma.allCharactersWhereInput[];
    NOT?: Prisma.allCharactersWhereInput | Prisma.allCharactersWhereInput[];
    createdAt?: Prisma.DateTimeFilter<"allCharacters"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"allCharacters"> | Date | string;
    characters?: Prisma.CharacterListRelationFilter;
}, "id">;
export type allCharactersOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.allCharactersCountOrderByAggregateInput;
    _max?: Prisma.allCharactersMaxOrderByAggregateInput;
    _min?: Prisma.allCharactersMinOrderByAggregateInput;
};
export type allCharactersScalarWhereWithAggregatesInput = {
    AND?: Prisma.allCharactersScalarWhereWithAggregatesInput | Prisma.allCharactersScalarWhereWithAggregatesInput[];
    OR?: Prisma.allCharactersScalarWhereWithAggregatesInput[];
    NOT?: Prisma.allCharactersScalarWhereWithAggregatesInput | Prisma.allCharactersScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"allCharacters"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"allCharacters"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"allCharacters"> | Date | string;
};
export type allCharactersCreateInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    characters?: Prisma.CharacterCreateNestedManyWithoutCharactersInput;
};
export type allCharactersUncheckedCreateInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    characters?: Prisma.CharacterUncheckedCreateNestedManyWithoutCharactersInput;
};
export type allCharactersUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    characters?: Prisma.CharacterUpdateManyWithoutCharactersNestedInput;
};
export type allCharactersUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    characters?: Prisma.CharacterUncheckedUpdateManyWithoutCharactersNestedInput;
};
export type allCharactersCreateManyInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type allCharactersUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type allCharactersUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type allCharactersCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type allCharactersMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type allCharactersMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AllCharactersScalarRelationFilter = {
    is?: Prisma.allCharactersWhereInput;
    isNot?: Prisma.allCharactersWhereInput;
};
export type allCharactersCreateNestedOneWithoutCharactersInput = {
    create?: Prisma.XOR<Prisma.allCharactersCreateWithoutCharactersInput, Prisma.allCharactersUncheckedCreateWithoutCharactersInput>;
    connectOrCreate?: Prisma.allCharactersCreateOrConnectWithoutCharactersInput;
    connect?: Prisma.allCharactersWhereUniqueInput;
};
export type allCharactersUpdateOneRequiredWithoutCharactersNestedInput = {
    create?: Prisma.XOR<Prisma.allCharactersCreateWithoutCharactersInput, Prisma.allCharactersUncheckedCreateWithoutCharactersInput>;
    connectOrCreate?: Prisma.allCharactersCreateOrConnectWithoutCharactersInput;
    upsert?: Prisma.allCharactersUpsertWithoutCharactersInput;
    connect?: Prisma.allCharactersWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.allCharactersUpdateToOneWithWhereWithoutCharactersInput, Prisma.allCharactersUpdateWithoutCharactersInput>, Prisma.allCharactersUncheckedUpdateWithoutCharactersInput>;
};
export type allCharactersCreateWithoutCharactersInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type allCharactersUncheckedCreateWithoutCharactersInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type allCharactersCreateOrConnectWithoutCharactersInput = {
    where: Prisma.allCharactersWhereUniqueInput;
    create: Prisma.XOR<Prisma.allCharactersCreateWithoutCharactersInput, Prisma.allCharactersUncheckedCreateWithoutCharactersInput>;
};
export type allCharactersUpsertWithoutCharactersInput = {
    update: Prisma.XOR<Prisma.allCharactersUpdateWithoutCharactersInput, Prisma.allCharactersUncheckedUpdateWithoutCharactersInput>;
    create: Prisma.XOR<Prisma.allCharactersCreateWithoutCharactersInput, Prisma.allCharactersUncheckedCreateWithoutCharactersInput>;
    where?: Prisma.allCharactersWhereInput;
};
export type allCharactersUpdateToOneWithWhereWithoutCharactersInput = {
    where?: Prisma.allCharactersWhereInput;
    data: Prisma.XOR<Prisma.allCharactersUpdateWithoutCharactersInput, Prisma.allCharactersUncheckedUpdateWithoutCharactersInput>;
};
export type allCharactersUpdateWithoutCharactersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type allCharactersUncheckedUpdateWithoutCharactersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type AllCharactersCountOutputType
 */
export type AllCharactersCountOutputType = {
    characters: number;
};
export type AllCharactersCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    characters?: boolean | AllCharactersCountOutputTypeCountCharactersArgs;
};
/**
 * AllCharactersCountOutputType without action
 */
export type AllCharactersCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AllCharactersCountOutputType
     */
    select?: Prisma.AllCharactersCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * AllCharactersCountOutputType without action
 */
export type AllCharactersCountOutputTypeCountCharactersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CharacterWhereInput;
};
export type allCharactersSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    characters?: boolean | Prisma.allCharacters$charactersArgs<ExtArgs>;
    _count?: boolean | Prisma.AllCharactersCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["allCharacters"]>;
export type allCharactersSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["allCharacters"]>;
export type allCharactersSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["allCharacters"]>;
export type allCharactersSelectScalar = {
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type allCharactersOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "createdAt" | "updatedAt", ExtArgs["result"]["allCharacters"]>;
export type allCharactersInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    characters?: boolean | Prisma.allCharacters$charactersArgs<ExtArgs>;
    _count?: boolean | Prisma.AllCharactersCountOutputTypeDefaultArgs<ExtArgs>;
};
export type allCharactersIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type allCharactersIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $allCharactersPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "allCharacters";
    objects: {
        characters: Prisma.$CharacterPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["allCharacters"]>;
    composites: {};
};
export type allCharactersGetPayload<S extends boolean | null | undefined | allCharactersDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$allCharactersPayload, S>;
export type allCharactersCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<allCharactersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AllCharactersCountAggregateInputType | true;
};
export interface allCharactersDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['allCharacters'];
        meta: {
            name: 'allCharacters';
        };
    };
    /**
     * Find zero or one AllCharacters that matches the filter.
     * @param {allCharactersFindUniqueArgs} args - Arguments to find a AllCharacters
     * @example
     * // Get one AllCharacters
     * const allCharacters = await prisma.allCharacters.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends allCharactersFindUniqueArgs>(args: Prisma.SelectSubset<T, allCharactersFindUniqueArgs<ExtArgs>>): Prisma.Prisma__allCharactersClient<runtime.Types.Result.GetResult<Prisma.$allCharactersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one AllCharacters that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {allCharactersFindUniqueOrThrowArgs} args - Arguments to find a AllCharacters
     * @example
     * // Get one AllCharacters
     * const allCharacters = await prisma.allCharacters.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends allCharactersFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, allCharactersFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__allCharactersClient<runtime.Types.Result.GetResult<Prisma.$allCharactersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first AllCharacters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {allCharactersFindFirstArgs} args - Arguments to find a AllCharacters
     * @example
     * // Get one AllCharacters
     * const allCharacters = await prisma.allCharacters.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends allCharactersFindFirstArgs>(args?: Prisma.SelectSubset<T, allCharactersFindFirstArgs<ExtArgs>>): Prisma.Prisma__allCharactersClient<runtime.Types.Result.GetResult<Prisma.$allCharactersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first AllCharacters that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {allCharactersFindFirstOrThrowArgs} args - Arguments to find a AllCharacters
     * @example
     * // Get one AllCharacters
     * const allCharacters = await prisma.allCharacters.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends allCharactersFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, allCharactersFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__allCharactersClient<runtime.Types.Result.GetResult<Prisma.$allCharactersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more AllCharacters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {allCharactersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AllCharacters
     * const allCharacters = await prisma.allCharacters.findMany()
     *
     * // Get first 10 AllCharacters
     * const allCharacters = await prisma.allCharacters.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const allCharactersWithIdOnly = await prisma.allCharacters.findMany({ select: { id: true } })
     *
     */
    findMany<T extends allCharactersFindManyArgs>(args?: Prisma.SelectSubset<T, allCharactersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$allCharactersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a AllCharacters.
     * @param {allCharactersCreateArgs} args - Arguments to create a AllCharacters.
     * @example
     * // Create one AllCharacters
     * const AllCharacters = await prisma.allCharacters.create({
     *   data: {
     *     // ... data to create a AllCharacters
     *   }
     * })
     *
     */
    create<T extends allCharactersCreateArgs>(args: Prisma.SelectSubset<T, allCharactersCreateArgs<ExtArgs>>): Prisma.Prisma__allCharactersClient<runtime.Types.Result.GetResult<Prisma.$allCharactersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many AllCharacters.
     * @param {allCharactersCreateManyArgs} args - Arguments to create many AllCharacters.
     * @example
     * // Create many AllCharacters
     * const allCharacters = await prisma.allCharacters.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends allCharactersCreateManyArgs>(args?: Prisma.SelectSubset<T, allCharactersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many AllCharacters and returns the data saved in the database.
     * @param {allCharactersCreateManyAndReturnArgs} args - Arguments to create many AllCharacters.
     * @example
     * // Create many AllCharacters
     * const allCharacters = await prisma.allCharacters.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many AllCharacters and only return the `id`
     * const allCharactersWithIdOnly = await prisma.allCharacters.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends allCharactersCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, allCharactersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$allCharactersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a AllCharacters.
     * @param {allCharactersDeleteArgs} args - Arguments to delete one AllCharacters.
     * @example
     * // Delete one AllCharacters
     * const AllCharacters = await prisma.allCharacters.delete({
     *   where: {
     *     // ... filter to delete one AllCharacters
     *   }
     * })
     *
     */
    delete<T extends allCharactersDeleteArgs>(args: Prisma.SelectSubset<T, allCharactersDeleteArgs<ExtArgs>>): Prisma.Prisma__allCharactersClient<runtime.Types.Result.GetResult<Prisma.$allCharactersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one AllCharacters.
     * @param {allCharactersUpdateArgs} args - Arguments to update one AllCharacters.
     * @example
     * // Update one AllCharacters
     * const allCharacters = await prisma.allCharacters.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends allCharactersUpdateArgs>(args: Prisma.SelectSubset<T, allCharactersUpdateArgs<ExtArgs>>): Prisma.Prisma__allCharactersClient<runtime.Types.Result.GetResult<Prisma.$allCharactersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more AllCharacters.
     * @param {allCharactersDeleteManyArgs} args - Arguments to filter AllCharacters to delete.
     * @example
     * // Delete a few AllCharacters
     * const { count } = await prisma.allCharacters.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends allCharactersDeleteManyArgs>(args?: Prisma.SelectSubset<T, allCharactersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more AllCharacters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {allCharactersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AllCharacters
     * const allCharacters = await prisma.allCharacters.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends allCharactersUpdateManyArgs>(args: Prisma.SelectSubset<T, allCharactersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more AllCharacters and returns the data updated in the database.
     * @param {allCharactersUpdateManyAndReturnArgs} args - Arguments to update many AllCharacters.
     * @example
     * // Update many AllCharacters
     * const allCharacters = await prisma.allCharacters.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more AllCharacters and only return the `id`
     * const allCharactersWithIdOnly = await prisma.allCharacters.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends allCharactersUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, allCharactersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$allCharactersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one AllCharacters.
     * @param {allCharactersUpsertArgs} args - Arguments to update or create a AllCharacters.
     * @example
     * // Update or create a AllCharacters
     * const allCharacters = await prisma.allCharacters.upsert({
     *   create: {
     *     // ... data to create a AllCharacters
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AllCharacters we want to update
     *   }
     * })
     */
    upsert<T extends allCharactersUpsertArgs>(args: Prisma.SelectSubset<T, allCharactersUpsertArgs<ExtArgs>>): Prisma.Prisma__allCharactersClient<runtime.Types.Result.GetResult<Prisma.$allCharactersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of AllCharacters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {allCharactersCountArgs} args - Arguments to filter AllCharacters to count.
     * @example
     * // Count the number of AllCharacters
     * const count = await prisma.allCharacters.count({
     *   where: {
     *     // ... the filter for the AllCharacters we want to count
     *   }
     * })
    **/
    count<T extends allCharactersCountArgs>(args?: Prisma.Subset<T, allCharactersCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AllCharactersCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a AllCharacters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllCharactersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AllCharactersAggregateArgs>(args: Prisma.Subset<T, AllCharactersAggregateArgs>): Prisma.PrismaPromise<GetAllCharactersAggregateType<T>>;
    /**
     * Group by AllCharacters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {allCharactersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends allCharactersGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: allCharactersGroupByArgs['orderBy'];
    } : {
        orderBy?: allCharactersGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, allCharactersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAllCharactersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the allCharacters model
     */
    readonly fields: allCharactersFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for allCharacters.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__allCharactersClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    characters<T extends Prisma.allCharacters$charactersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.allCharacters$charactersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CharacterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the allCharacters model
 */
export interface allCharactersFieldRefs {
    readonly id: Prisma.FieldRef<"allCharacters", 'String'>;
    readonly createdAt: Prisma.FieldRef<"allCharacters", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"allCharacters", 'DateTime'>;
}
/**
 * allCharacters findUnique
 */
export type allCharactersFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the allCharacters
     */
    select?: Prisma.allCharactersSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the allCharacters
     */
    omit?: Prisma.allCharactersOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.allCharactersInclude<ExtArgs> | null;
    /**
     * Filter, which allCharacters to fetch.
     */
    where: Prisma.allCharactersWhereUniqueInput;
};
/**
 * allCharacters findUniqueOrThrow
 */
export type allCharactersFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the allCharacters
     */
    select?: Prisma.allCharactersSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the allCharacters
     */
    omit?: Prisma.allCharactersOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.allCharactersInclude<ExtArgs> | null;
    /**
     * Filter, which allCharacters to fetch.
     */
    where: Prisma.allCharactersWhereUniqueInput;
};
/**
 * allCharacters findFirst
 */
export type allCharactersFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the allCharacters
     */
    select?: Prisma.allCharactersSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the allCharacters
     */
    omit?: Prisma.allCharactersOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.allCharactersInclude<ExtArgs> | null;
    /**
     * Filter, which allCharacters to fetch.
     */
    where?: Prisma.allCharactersWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of allCharacters to fetch.
     */
    orderBy?: Prisma.allCharactersOrderByWithRelationInput | Prisma.allCharactersOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for allCharacters.
     */
    cursor?: Prisma.allCharactersWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` allCharacters from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` allCharacters.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of allCharacters.
     */
    distinct?: Prisma.AllCharactersScalarFieldEnum | Prisma.AllCharactersScalarFieldEnum[];
};
/**
 * allCharacters findFirstOrThrow
 */
export type allCharactersFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the allCharacters
     */
    select?: Prisma.allCharactersSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the allCharacters
     */
    omit?: Prisma.allCharactersOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.allCharactersInclude<ExtArgs> | null;
    /**
     * Filter, which allCharacters to fetch.
     */
    where?: Prisma.allCharactersWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of allCharacters to fetch.
     */
    orderBy?: Prisma.allCharactersOrderByWithRelationInput | Prisma.allCharactersOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for allCharacters.
     */
    cursor?: Prisma.allCharactersWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` allCharacters from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` allCharacters.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of allCharacters.
     */
    distinct?: Prisma.AllCharactersScalarFieldEnum | Prisma.AllCharactersScalarFieldEnum[];
};
/**
 * allCharacters findMany
 */
export type allCharactersFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the allCharacters
     */
    select?: Prisma.allCharactersSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the allCharacters
     */
    omit?: Prisma.allCharactersOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.allCharactersInclude<ExtArgs> | null;
    /**
     * Filter, which allCharacters to fetch.
     */
    where?: Prisma.allCharactersWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of allCharacters to fetch.
     */
    orderBy?: Prisma.allCharactersOrderByWithRelationInput | Prisma.allCharactersOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing allCharacters.
     */
    cursor?: Prisma.allCharactersWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` allCharacters from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` allCharacters.
     */
    skip?: number;
    distinct?: Prisma.AllCharactersScalarFieldEnum | Prisma.AllCharactersScalarFieldEnum[];
};
/**
 * allCharacters create
 */
export type allCharactersCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the allCharacters
     */
    select?: Prisma.allCharactersSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the allCharacters
     */
    omit?: Prisma.allCharactersOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.allCharactersInclude<ExtArgs> | null;
    /**
     * The data needed to create a allCharacters.
     */
    data: Prisma.XOR<Prisma.allCharactersCreateInput, Prisma.allCharactersUncheckedCreateInput>;
};
/**
 * allCharacters createMany
 */
export type allCharactersCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many allCharacters.
     */
    data: Prisma.allCharactersCreateManyInput | Prisma.allCharactersCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * allCharacters createManyAndReturn
 */
export type allCharactersCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the allCharacters
     */
    select?: Prisma.allCharactersSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the allCharacters
     */
    omit?: Prisma.allCharactersOmit<ExtArgs> | null;
    /**
     * The data used to create many allCharacters.
     */
    data: Prisma.allCharactersCreateManyInput | Prisma.allCharactersCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * allCharacters update
 */
export type allCharactersUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the allCharacters
     */
    select?: Prisma.allCharactersSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the allCharacters
     */
    omit?: Prisma.allCharactersOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.allCharactersInclude<ExtArgs> | null;
    /**
     * The data needed to update a allCharacters.
     */
    data: Prisma.XOR<Prisma.allCharactersUpdateInput, Prisma.allCharactersUncheckedUpdateInput>;
    /**
     * Choose, which allCharacters to update.
     */
    where: Prisma.allCharactersWhereUniqueInput;
};
/**
 * allCharacters updateMany
 */
export type allCharactersUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update allCharacters.
     */
    data: Prisma.XOR<Prisma.allCharactersUpdateManyMutationInput, Prisma.allCharactersUncheckedUpdateManyInput>;
    /**
     * Filter which allCharacters to update
     */
    where?: Prisma.allCharactersWhereInput;
    /**
     * Limit how many allCharacters to update.
     */
    limit?: number;
};
/**
 * allCharacters updateManyAndReturn
 */
export type allCharactersUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the allCharacters
     */
    select?: Prisma.allCharactersSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the allCharacters
     */
    omit?: Prisma.allCharactersOmit<ExtArgs> | null;
    /**
     * The data used to update allCharacters.
     */
    data: Prisma.XOR<Prisma.allCharactersUpdateManyMutationInput, Prisma.allCharactersUncheckedUpdateManyInput>;
    /**
     * Filter which allCharacters to update
     */
    where?: Prisma.allCharactersWhereInput;
    /**
     * Limit how many allCharacters to update.
     */
    limit?: number;
};
/**
 * allCharacters upsert
 */
export type allCharactersUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the allCharacters
     */
    select?: Prisma.allCharactersSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the allCharacters
     */
    omit?: Prisma.allCharactersOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.allCharactersInclude<ExtArgs> | null;
    /**
     * The filter to search for the allCharacters to update in case it exists.
     */
    where: Prisma.allCharactersWhereUniqueInput;
    /**
     * In case the allCharacters found by the `where` argument doesn't exist, create a new allCharacters with this data.
     */
    create: Prisma.XOR<Prisma.allCharactersCreateInput, Prisma.allCharactersUncheckedCreateInput>;
    /**
     * In case the allCharacters was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.allCharactersUpdateInput, Prisma.allCharactersUncheckedUpdateInput>;
};
/**
 * allCharacters delete
 */
export type allCharactersDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the allCharacters
     */
    select?: Prisma.allCharactersSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the allCharacters
     */
    omit?: Prisma.allCharactersOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.allCharactersInclude<ExtArgs> | null;
    /**
     * Filter which allCharacters to delete.
     */
    where: Prisma.allCharactersWhereUniqueInput;
};
/**
 * allCharacters deleteMany
 */
export type allCharactersDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which allCharacters to delete
     */
    where?: Prisma.allCharactersWhereInput;
    /**
     * Limit how many allCharacters to delete.
     */
    limit?: number;
};
/**
 * allCharacters.characters
 */
export type allCharacters$charactersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Character
     */
    select?: Prisma.CharacterSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Character
     */
    omit?: Prisma.CharacterOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CharacterInclude<ExtArgs> | null;
    where?: Prisma.CharacterWhereInput;
    orderBy?: Prisma.CharacterOrderByWithRelationInput | Prisma.CharacterOrderByWithRelationInput[];
    cursor?: Prisma.CharacterWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CharacterScalarFieldEnum | Prisma.CharacterScalarFieldEnum[];
};
/**
 * allCharacters without action
 */
export type allCharactersDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the allCharacters
     */
    select?: Prisma.allCharactersSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the allCharacters
     */
    omit?: Prisma.allCharactersOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.allCharactersInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=allCharacters.d.ts.map