
export interface Image {
    id: number;
    pizza_id: number;
    thumb?: any;
    small: string;
    medium: string;
    large?: any;
    original?: any;
    caption?: any;
    default: number;
    status: number;
    created_at?: any;
    updated_at?: any;
}

export interface Topping {
    id: number;
    name: string;
    slug: string;
    icon: string;
    amount: number;
    created_at?: any;
    updated_at?: any;
}

export interface ITopping {
    id: number;
    name: string;
    slug: string;
    icon: string;
    amount: number;
    created_at?: any;
    updated_at?: any;
}

export interface IPizza {
    id: number;
    name: string;
    slug: string;
    amount: string;
    description: string;
    status: number;
    created_at?: any;
    updated_at?: any;
    image: Image;
    toppings: Topping[];
}