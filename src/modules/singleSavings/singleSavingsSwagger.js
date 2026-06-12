/**
 * @swagger
 * tags:
 *   name: Single Savings
 *   description: Single savings management endpoints
 */

/**
 * @swagger
 * /api/singleSavings/create-single-savings:
 *   post:
 *     summary: Create a single savings plan
 *     tags: [Single Savings]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 500
 *     responses:
 *       201:
 *         description: Single savings plan created successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/singleSavings/get-total-yield/{planId}:
 *   get:
 *     summary: Get total yield of a savings plan
 *     tags: [Single Savings]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: planId
 *         required: true
 *         schema:
 *           type: string
 *         example: 6869f6f6dbe5e3c6d1c5b123
 *     responses:
 *       200:
 *         description: Yield fetched successfully
 *       404:
 *         description: Plan not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/singleSavings/get-single-savings-history:
 *   get:
 *     summary: Get authenticated user's savings history
 *     tags: [Single Savings]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Savings history retrieved successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/singleSavings/withdraw-single-savings/{planId}:
 *   patch:
 *     summary: Withdraw from a savings plan
 *     tags: [Single Savings]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: planId
 *         required: true
 *         schema:
 *           type: string
 *         example: 6869f6f6dbe5e3c6d1c5b123
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 100
 *     responses:
 *       200:
 *         description: Withdrawal successful
 *       400:
 *         description: Invalid withdrawal amount
 *       404:
 *         description: Savings plan not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/singleSavings/single-savings-withdrawal-history:
 *   get:
 *     summary: Get authenticated user's withdrawal history
 *     tags: [Single Savings]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Withdrawal history retrieved successfully
 *       401:
 *         description: Unauthorized
 */