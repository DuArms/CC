const router = require('express').Router();

const { classroomController } = require('../controllers');
const { scheduleController } = require('../controllers');

router.post('api/classrooms',classroomController.createClassroom);
router.post('api/classrooms/:classroomId',classroomController.joinClassroom);
router.get('api/classrooms/:classroomId',classroomController.getClassroomDetails);
router.get('api/classrooms/:classroomId/members',classroomController.getMembers);
router.get('api/classrooms/:classroomId/members/:memberId',classroomController.getMemberByClassId);
router.delete('api/classrooms/:classroomId',classroomController.deleteClassroom);

router.post('api/classrooms/:classroomId/schedules/',scheduleController.addSchedule);
router.delete('api/classrooms/:classroomId/schedules/:scheduleId',scheduleController.deleteSchedule);

module.exports = router
