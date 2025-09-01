const fs = require('fs');
const path = require('path');

class StudentManager {
    constructor() {
        this.students = [];
        this.loadStudents();
    }

    // Charger les données des élèves depuis le fichier
    loadStudents() {
        try {
            const filePath = path.join(__dirname, 'data', 'student.txt');
            const data = fs.readFileSync(filePath, 'utf8');
            this.students = JSON.parse(data);
            console.log(`✅ ${this.students.length} élèves chargés avec succès.`);
        } catch (error) {
            console.error('❌ Erreur lors du chargement des données:', error.message);
            this.students = [];
        }
    }

    // Calculer la moyenne d'un élève
    calculateAverage(notes) {
        if (!Array.isArray(notes) || notes.length === 0) {
            return 0;
        }
        return notes.reduce((sum, note) => sum + note, 0) / notes.length;
    }

    // 1. Afficher la liste de tous les élèves
    displayAllStudents() {
        console.log('\n📋 LISTE DE TOUS LES ÉLÈVES:');
        console.log('=' .repeat(60));
        
        if (this.students.length === 0) {
            console.log('❌ Aucun élève trouvé.');
            return;
        }

        // Préparer les données pour console.table
        const tableData = this.students.map((student, index) => {
            const average = this.calculateAverage(student.notes);
            return {
                'N°': index + 1,
                'Nom': student.name,
                'Adresse': student.address,
                'Notes': `[${student.notes.join(', ')}]`,
                'Moyenne': `${average.toFixed(2)}/20`
            };
        });

        console.table(tableData);
    }

    // 2. Rechercher un élève par nom
    searchStudentByName(searchName) {
        if (!searchName || typeof searchName !== 'string') {
            console.log('❌ Veuillez fournir un nom valide pour la recherche.');
            return;
        }

        const searchTerm = searchName.trim().toUpperCase();
        const foundStudents = this.students.filter(student => 
            student.name.toUpperCase().includes(searchTerm)
        );

        console.log(`\n🔍 RÉSULTATS DE RECHERCHE POUR "${searchName}":`);
        console.log('=' .repeat(60));

        if (foundStudents.length === 0) {
            console.log('❌ Aucun élève trouvé avec ce nom.');
            return;
        }

        // Préparer les données pour console.table
        const tableData = foundStudents.map((student, index) => {
            const average = this.calculateAverage(student.notes);
            return {
                'N°': index + 1,
                'Nom': student.name,
                'Adresse': student.address,
                'Notes': `[${student.notes.join(', ')}]`,
                'Moyenne': `${average.toFixed(2)}/20`
            };
        });

        console.table(tableData);
    }

    // 3. Filtrer les élèves par moyenne
    filterStudentsByAverage(minAverage) {
        const numAverage = parseFloat(minAverage);
        
        if (isNaN(numAverage) || numAverage < 0 || numAverage > 20) {
            console.log('❌ Veuillez fournir une moyenne valide entre 0 et 20.');
            return;
        }

        const filteredStudents = this.students.filter(student => {
            const average = this.calculateAverage(student.notes);
            return average > numAverage;
        });

        console.log(`\n📊 ÉLÈVES AVEC UNE MOYENNE SUPÉRIEURE À ${numAverage}:`);
        console.log('=' .repeat(60));

        if (filteredStudents.length === 0) {
            console.log(`❌ Aucun élève n'a une moyenne supérieure à ${numAverage}.`);
            return;
        }

        // Préparer les données pour console.table
        const tableData = filteredStudents.map((student, index) => {
            const average = this.calculateAverage(student.notes);
            return {
                'N°': index + 1,
                'Nom': student.name,
                'Adresse': student.address,
                'Notes': `[${student.notes.join(', ')}]`,
                'Moyenne': `${average.toFixed(2)}/20`
            };
        });

        console.table(tableData);
    }

    // Afficher les statistiques générales
    displayStatistics() {
        if (this.students.length === 0) {
            console.log('❌ Aucune donnée disponible pour les statistiques.');
            return;
        }

        const averages = this.students.map(student => this.calculateAverage(student.notes));
        const maxAverage = Math.max(...averages);
        const minAverage = Math.min(...averages);
        const totalAverage = averages.reduce((sum, avg) => sum + avg, 0) / averages.length;

        console.log('\n📈 STATISTIQUES GÉNÉRALES:');
        console.log('=' .repeat(40));
        console.log(`👥 Nombre total d'élèves: ${this.students.length}`);
        console.log(`📊 Moyenne générale: ${totalAverage.toFixed(2)}/20`);
        console.log(`🏆 Meilleure moyenne: ${maxAverage.toFixed(2)}/20`);
        console.log(`📉 Plus faible moyenne: ${minAverage.toFixed(2)}/20`);
    }
}

// Fonction principale pour tester le système
function main() {
    console.log('🎓 SYSTÈME DE GESTION DES ÉLÈVES');
    console.log('=' .repeat(50));
    
    const studentManager = new StudentManager();

    // Test 1: Afficher tous les élèves
    console.log('\n🧪 TEST 1: Affichage de tous les élèves');
    studentManager.displayAllStudents();

    // Test 2: Recherche par nom
    console.log('\n🧪 TEST 2: Recherche par nom');
    studentManager.searchStudentByName('EMILY');
    studentManager.searchStudentByName('MARTIN');
    studentManager.searchStudentByName('XYZ'); // Test avec un nom inexistant

    // Test 3: Filtrage par moyenne
    console.log('\n🧪 TEST 3: Filtrage par moyenne');
    studentManager.filterStudentsByAverage(15);
    studentManager.filterStudentsByAverage(18);
    studentManager.filterStudentsByAverage(25); // Test avec une moyenne impossible

    // Test 4: Statistiques
    studentManager.displayStatistics();

    // Test 5: Gestion des erreurs
    console.log('\n🧪 TEST 5: Gestion des erreurs');
    studentManager.searchStudentByName(''); // Nom vide
    studentManager.searchStudentByName(123); // Nom non-string
    studentManager.filterStudentsByAverage('abc'); // Moyenne invalide
    studentManager.filterStudentsByAverage(-5); // Moyenne négative
}

// Exécuter le programme
if (require.main === module) {
    main();
}

module.exports = StudentManager;
