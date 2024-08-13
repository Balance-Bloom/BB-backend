import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addBookings, addDoctors, addMessage, createChat, deleteBookings, deleteDoctors, getBookings, getDoctors, getMessages, updateBookings, updateDoctors } from "../controllers/bookings.js";
import { remoteUpload } from "../middlewares/uploads.js";
import { getNotification } from "../controllers/notification.js";


const bookingRouter = Router();


bookingRouter.get('/appointments', isAuthenticated, getBookings)
bookingRouter.get('/doctors', isAuthenticated, getDoctors)
bookingRouter.get('/send/:chatId', getMessages);
bookingRouter.get('/notification', getNotification);



bookingRouter.post('/appointments', isAuthenticated, addBookings)
bookingRouter.post('/doctors', isAuthenticated, remoteUpload.single('image'), addDoctors)
bookingRouter.post('/chat', createChat)
bookingRouter.post('/send', addMessage);



bookingRouter.patch('/appointments/:id', isAuthenticated, updateBookings)
bookingRouter.patch('/doctors/:id', isAuthenticated, remoteUpload.single('image'), updateDoctors)

bookingRouter.delete('/appointments/:id', isAuthenticated, deleteBookings)
bookingRouter.delete('/doctors/:id', isAuthenticated, deleteDoctors)

// Export router
export default bookingRouter;