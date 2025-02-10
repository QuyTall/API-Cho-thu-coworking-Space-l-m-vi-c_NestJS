import { Controller, Get, Post, Delete, Param, Body, Req } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Booking } from './booking.schema';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}


  @Post()
  async createBooking(@Body() bookingData: Partial<Booking>): Promise<Booking> {
    return this.bookingsService.create(bookingData);
  }

 
  @Get()
  async getAllBookings(@Req() req: any): Promise<Booking[]> {
    return this.bookingsService.findAll(req.user.role, req.user.id);
  }

 
  @Delete(':id')
  async deleteBooking(@Param('id') id: string, @Req() req: any): Promise<{ message: string }> {
    await this.bookingsService.delete(id, req.user.id, req.user.role);
    return { message: 'Booking deleted successfully' };
  }
}
