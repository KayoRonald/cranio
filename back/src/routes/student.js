const express = require('express')
const router = express.Router()
const asyncRoutes = require('../helpers/async-routes')

const Student = require('../models/Student')

/**
 * Retorna os dados de um estudante
 */
router.get('/:registration', asyncRoutes(async (req, res) => {
	const { registration } = req.params
	let student = await Student.findOne({ registration })
	res.json(student)
}))

/**
 * Define que o estudante já jogou hoje
 */
router.get('/:registration/confirm', asyncRoutes(async (req, res) => {
	const { registration } = req.params
	const student = await Student.findOne({ registration })
	await student.playedToday()
	res.json(student)
}))

/**
 * Adiciona um estudante
 */
router.post('/add', asyncRoutes(async (req, res) => {
	const { name, registration, course } = req.body
	const student = await Student.create({ name, registration, course })
	res.json(student)
}))

module.exports = router