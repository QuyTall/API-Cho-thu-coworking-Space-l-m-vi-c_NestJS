import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from './booking.schema';

@Injectable()
export class BookingsService {
  constructor(@InjectModel(Booking.name) private bookingModel: Model<BookingDocument>) {}

  async create(bookingData: Partial<Booking>): Promise<Booking> {
    const newBooking = new this.bookingModel(bookingData);
    return newBooking.save();
  }

  async findAll(role: string, userId: string): Promise<Booking[]> {
    if (role === 'admin') {
      return this.bookingModel.find().exec(); // Admin xem tất cả
    }
    return this.bookingModel.find({ userId }).exec(); // User chỉ xem đặt chỗ của họ
  }

  async delete(id: string, userId: string, role: string): Promise<void> {
    const booking = await this.bookingModel.findById(id);
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    if (role !== 'admin' && booking.userId !== userId) {
      throw new ForbiddenException('You can only delete your own bookings');
    }
    await this.bookingModel.findByIdAndDelete(id).exec();
  }
}
