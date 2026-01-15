import { ITicketPaymentService } from '../models/ITicketPaymentService';
import { PayTicketInput } from '../models/PayTicketInput';

// IVA constant (e.g. 0.16 for 16%)
const IVA_RATE = 0.16;

export class PayTicketUseCase {
  constructor(private paymentService: ITicketPaymentService) {}

  async execute(input: PayTicketInput): Promise<{ total: number; totalWithIva: number }> {
    // Business logic: fetch/compute total for tickets
    const total = await this.paymentService.getTotalForTickets(input.ticketUuids);
    const totalWithIva = parseFloat((total * (1 + IVA_RATE)).toFixed(2));
    return { total, totalWithIva };
  }
}