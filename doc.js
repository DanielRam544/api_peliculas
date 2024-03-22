/**
 * @swagger
 * /peliculas:
 *   post:
 *     summary: Crear una nueva pelicula
 *     parameters:
 *      - in: body
 *        required: true
 *        name: pelicula
 *        schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Nueva pelicula"
 *               trama:
 *                 type: string
 *                 example: "Trama de la pelicula"
 *               autor:
 *                 type: string
 *                 example: "Nombre del autor"
 *               año:
 *                 type: number
 *                 example: 1980
 *     responses:
 *       201:
 *         description: Libro creado exitosamente
 */

/**
 * @swagger
 * /peliculas:
 *   get:
 *     summary: Obtener todas las peliculas
 *     responses:
 *       200:
 *         description: Lista de peliculas
 */

/**
 * @swagger
 * /peliculas/{id}:
 *   get:
 *     summary: Obtener una película por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID de la película
 *     responses:
 *       '200':
 *         description: Película encontrada
 *       '404':
 *         description: Película no encontrada
 *       '500':
 *         description: Error al obtener la película
 */

/**
 * @swagger
 * /peliculas/{id}:
 *   put:
 *     summary: Actualizar una película por su ID
 *     parameters:
 *       - in: path
 *         required: true
 *         name: id
 *         schema:
 *           type: string
 *           example: "identificador_de_pelicula"
 *         description: El ID de la película a actualizar
 *       - in: body
 *         required: true
 *         name: pelicula
 *         schema:
 *           type: object
 *           properties:
 *             titulo:
 *               type: string
 *               example: "Nuevo título de la película"
 *             trama:
 *               type: string
 *               example: "Nueva trama de la película"
 *             autor:
 *               type: string
 *               example: "Nombre del director"
 *             year:
 *               type: number
 *               example: 2024
 *     responses:
 *       '201':
 *         description: Película actualizada exitosamente
 */

/**
 * @swagger
 * /peliculas/{id}:
 *   delete:
 *     summary: Eliminar una película por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la película
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Película eliminada con éxito
 *       404:
 *         description: Película no encontrada
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     parameters:
 *      - in: body
 *        required: true
 *        name: usuario
 *        schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Nombre de usuario"
 *               email:
 *                 type: string
 *                 example: "usuario@example.com"
 *               password:
 *                 type: string
 *                 example: "contraseña123"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 */
