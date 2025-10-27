import statusesJson from './http-statuses.json';

type StatusJson = {
    [code: string]: {
        code: number;
        name: { en: string; es: string };
        category: { en: string; es: string };
        description: { en: string; es: string };
        possibleCauses: { en: string[]; es: string[] };
        defaultResponse: { en: any; es: any };
        userCustomizable: { extra: Record<string, any> };
    };
};

const statuses = statusesJson as StatusJson;

export type StatusFlowLang = 'es' | 'en';

export interface StatusFlowOptions {
    code: number;
    lang?: StatusFlowLang;
    extra?: Record<string, any>;
    overrideMessage?: string;
}

export function StatusFlow({
    code,
    lang = 'es',
    extra = {},
    overrideMessage,
}: StatusFlowOptions) {
    const status = statuses[String(code)];
    if (!status) {
        return {
            success: false,
            message: `Código HTTP desconocido: ${code}`,
            code,
            ...extra,
        };
    }
    const response = { ...status.defaultResponse[lang] };
    if (overrideMessage) response.message = overrideMessage;
    return {
        ...response,
        ...extra,
        info: {
            name: status.name[lang],
            category: status.category[lang],
            description: status.description[lang],
            possibleCauses: status.possibleCauses[lang],
        },
    };
}

export const StatusFlowCodes = Object.freeze(
    Object.fromEntries(
        Object.entries(statuses).map(([k, v]) => [
            v &&
            typeof v === 'object' &&
            'name' in v &&
            v.name &&
            typeof v.name.en === 'string'
                ? v.name.en.toUpperCase().replace(/\s+/g, '_')
                : k,
            v && typeof v === 'object' && 'code' in v
                ? (v as any).code
                : Number(k),
        ])
    )
);
