import { ReactNode } from "react";
import { IconType } from 'react-icons';

export interface Food {
    id: number;
    name: string;
    description: string;
    price: string;
    available: boolean;
    image: string;
};

export interface ModalAddFoodProps {
    setIsOpen: () => void;
    handleAddFood: (food: Food) => void;
    isOpen: boolean;
}

export interface ModalEditFoodProps {
    setIsOpen: () => void;
    handleUpdateFood: (food: Food) => void;
    editingFood: Food;
    isOpen: boolean;
}

export interface ModalProps {
    isOpen: boolean; 
    setIsOpen: () => void; 
    children: ReactNode;
}


export interface InputProps {
    name: string;
    icon?: IconType;
}

export interface HeaderProps {
    openModal: () => void;
}

export interface FoodProps {
    food: Food; 
    handleDelete: (id: number) => void; 
    handleEditFood: (food: Food) => void;
}