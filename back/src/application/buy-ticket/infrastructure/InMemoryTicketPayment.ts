import { ITicketPaymentService } from '../models/ITicketPaymentService';

// Stub database table: ticket price is $100 each
const TICKET_PRICE = 100; // Could be cents or USD, for demo
const TICKET_DB: Map<string, number> = new Map(); // ticketUuid -> price


export class InMemoryTicketPayment implements ITicketPaymentService {
  async getTotalForTickets(ticketUuids: string[]): Promise<number> {

    let total = 0

    ticketUuids.forEach(uuid => {
      if(!TICKET_DB.get(uuid)){
        total += TICKET_PRICE;
        TICKET_DB.set(uuid, TICKET_PRICE); // In real app, fetch from DB
      }
    });

    return total;
  }
}
