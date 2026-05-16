import fs from 'fs';
import path from 'path';

const filePath = 'd:/Sistem Akademik SMK/src/data/teachers.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const fixedTeachers = data.teachers.map(t => {
  // If name looks like a number and niup looks like a name, swap them
  if (/^\d+$/.test(t.name) && /[a-zA-Z]/.test(t.niup)) {
    const oldName = t.name;
    t.name = t.niup;
    t.niup = oldName;
  }
  
  // If subjects contain 'Laki' or 'Perempuan', it's probably wrong data from gender column
  if (t.subjects.some(s => s === 'Laki' || s === 'Perempuan' || s === 'L' || s === 'P')) {
    t.subjects = [];
  }
  
  return t;
});

fs.writeFileSync(filePath, JSON.stringify({ teachers: fixedTeachers }, null, 2));
console.log('Fixed teachers.json');
