import { useState } from "react";

export interface DiscloseType {
    isOpen: boolean;
    onOpen: (callback?: () => void) => void;
    onClose: (callback?: () => void) => void;
    onToggle: (callback?: () => void) => void;
}

export const useDisclose = (initOpen?: boolean) => {
    const [isOpen, setIsOpen] = useState<boolean>(initOpen ?? false)
    
    const onOpen = (callback?: () => void) => {
        setIsOpen(true)
        if (callback) {
            callback()
        }
    }

    const onClose = (callback?: () => void) => {
        setIsOpen(false)
        if (callback) {
            callback()
        }
    }

    const onToggle = (callback?: () => void) => {
        setIsOpen(prev => !prev)
        if (callback) {
            callback()
        }
    }

    return {
        isOpen,
        onOpen,
        onClose,
        onToggle
    }
}