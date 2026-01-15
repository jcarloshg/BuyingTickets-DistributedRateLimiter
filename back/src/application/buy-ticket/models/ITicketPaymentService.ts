// Port: Interface for making ticket payments (hexagonal architecture)

export interface ITicketPaymentService {
  // Returns amount for tickets in cents or USD etc; a stub, real code would query DB
  getTotalForTickets(ticketUuids: string[]): Promise<number>;
  // Optionally: add method to charge credit card
}
