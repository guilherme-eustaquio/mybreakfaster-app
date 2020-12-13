export class OrderConstant {

    public static ORDER_STATUS = {
        WAITING_ESTABLISHMENT_APPROVAL: "Aguardando aprov. do estabelecimento",
        CANCELED_BY_CLIENT: "Cancelado pelo cliente",
        DELIVERY_CONFIRMED: "Confirmado pelo estabelecimento",
        CANCELED_BY_ESTABLISHMENT: "Cancelado pelo estabelecimento",
        BEING_PREPARED: "Sendo preparado",
        ON_ROUTE: "A caminho",
        READY_TO_BE_PICKED: "Pronto para ser pegue",
        DELIVERED: "Entregue",
        WITHDRAWN: "Retirado"
    };

    public static PICK_TYPE = {
        RETRIEVE: "Receber no caixa",
        DELIEVER: "Entregar delivery"
    };

    public static TYPE_PRODUCT_LIST = {
        DELIVERY: "Delivery",
        WITHDRAWAL_ON_STORE: "Somente no estabelecimento",
        DELIVERY_AND_WITHDRAWAL: "Estabelecimento e delivery"
    };
}