/*
    MIT License
    
    Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
    Mindoro State University - Philippines

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    */
import { Library, sequelize } from "../models/Library.js";

await sequelize.sync();

const library = {
    index: async (req, res) => {
        try {
            const record = await Library.findAll();
            res.render("insert", {record});
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    insert: async (req, res) => {
        try {
            const {bookTitle, borrowerName, borrowedDate, returnDate, status, remarks} = req.body;
            await Library.create({bookTitle, borrowerName, borrowedDate, returnDate, status, remarks});
            res.redirect("/library");
        } catch (error) {
            res.status(400).send(error.message);
        }
    },
    getRecord: async(req, res) =>{
      const id = req.params.id;
      const record = await Library.findByPk(id);
      res.render("edit", {record});
    },
    one: async (req, res) => {
        const { id } = req.params;
        const data = await Library.findByPk(id);

        if (!data) {
            return res.status(404).json({
                message: "Library record not found"
            });
        }
        res.json({ data });
    },
    update: async (req, res) => {
        const { id } = req.params;
        const {bookTitle, borrowerName, borrowedDate, returnDate, status, remarks} = req.body;
        const record = await Library.findByPk(id);

        if (!record) {
            return res.status(404).json({
                message: "Library record not found"
            });
        }

        await record.update({bookTitle, borrowerName, borrowedDate, returnDate, status, remarks});
        res.redirect("/library");
    },
    delete: async (req, res) => {
        const { id } = req.params;
        const record = await Library.findByPk(id);

        if (!record) {
            return res.status(404).json({
                message: "Library record not found"
            });
        }
        await record.destroy();
        res.redirect("/library");
    }
};

export { library };