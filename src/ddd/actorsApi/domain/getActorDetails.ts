interface RequestParams {
    limit: number;
    month: number;
    day: number;
}

interface ActorDetails {
    id: string,
    image?: string,
    name?: string,
    dob?: string,
    birthPlace?: string,
    gender?: string,
    height?: string,
    description?: string,
    msg?: string
}

export { RequestParams, ActorDetails };