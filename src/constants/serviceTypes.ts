export type Metrics = {
    latency: number;
    uptime: number;
    requests: number;
    errors: number;
};

export type Developer = {
    id: string;
    name: string;
    email: string;
    avatar: string;
};

export type Version = {
    id: string;
    name: string;
    description: string;
    developer: Developer;
    updated_at: string;
};

export type Service = {
    id: string;
    name: string;
    description: string;
    type: string;
    published: boolean;
    configured: boolean;
    versions: Version[];
    metrics: Metrics;
};
