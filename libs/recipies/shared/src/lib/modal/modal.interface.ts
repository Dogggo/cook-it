export interface ModalInterface { 
    cancelButtonLabel: string;
    confirmButtonLabel: string;
    modalHeader: string;
    modalContent: string;
    callbackMethod: () => void;
}