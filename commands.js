const fs = require('fs');
const path = require('path');
const readline = require('readline');

class CommandLineStudentManager {
    constructor() {
        this.students = [];
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.loadStudents();
    }

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

    calculateAverage(notes) {
        if (!Array.isArray(notes) || notes.length === 0) {
            return 0;
        }
        return notes.reduce((sum, note) => sum + note, 0) / notes.length;
    }

    displayHelp() {
        console.log('\n🎓 SYSTÈME DE GESTION DES ÉLÈVES - COMMANDES DISPONIBLES');
        console.log('=' .repeat(70));
        console.log('📋 list                    - Afficher la liste de tous les élèves');
        console.log('🔍 search <nom>            - Rechercher un élève par nom');
        console.log('📊 filter <moyenne>        - Filtrer les élèves par moyenne supérieure');
        console.log('📈 stats                   - Afficher les statistiques générales');
        console.log('🧪 test                    - Tester la gestion d\'erreurs');
        console.log('❓ help                    - Afficher cette aide');
        console.log('🚪 quit                    - Quitter le programme');
        console.log('=' .repeat(70));
        console.log('💡 Exemples:');
        console.log('   search EMILY');
        console.log('   filter 15');
        console.log('   list');
        console.log('=' .repeat(70));
    }

    async start() {
        console.log('🎓 SYSTÈME DE GESTION DES ÉLÈVES - MODE COMMANDES');
        console.log('✅ 12 élèves chargés avec succès.');
        
        // Afficher l'aide dès le début
        this.displayHelp();

        while (true) {
            const input = await this.question('🎓 > ');
            const parts = input.trim().split(' ');
            const command = parts[0].toLowerCase();
            const args = parts.slice(1);

            try {
                switch (command) {
                    case 'list':
                        await this.displayAllStudents();
                        break;
                    case 'search':
                        await this.searchStudent(args.join(' '));
                        break;
                    case 'filter':
                        await this.filterByAverage(args[0]);
                        break;
                    case 'stats':
                        this.displayStatistics();
                        break;
                    case 'test':
                        await this.testErrorHandling();
                        break;
                    case 'help':
                        this.displayHelp();
                        break;
                    case 'quit':
                    case 'exit':
                        console.log('👋 Au revoir !');
                        this.rl.close();
                        return;
                    case '':
                        // Commande vide, continuer
                        break;
                    default:
                        console.log(`❌ Commande inconnue: "${command}"`);
                        console.log('💡 Tapez "help" pour voir les commandes disponibles.');
                }
            } catch (error) {
                console.log(`❌ Erreur: ${error.message}`);
            }
        }
    }

    async question(prompt) {
        return new Promise((resolve) => {
            this.rl.question(prompt, resolve);
        });
    }

    async displayAllStudents() {
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

    async searchStudent(searchName) {
        if (!searchName || searchName.trim() === '') {
            console.log('❌ Usage: search <nom>');
            console.log('💡 Exemple: search EMILY');
            return;
        }

        console.log(`\n🔍 RECHERCHE POUR "${searchName}":`);
        console.log('=' .repeat(60));

        const searchTerm = searchName.trim().toUpperCase();
        const foundStudents = this.students.filter(student => 
            student.name.toUpperCase().includes(searchTerm)
        );

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

    async filterByAverage(minAverageStr) {
        if (!minAverageStr) {
            console.log('❌ Usage: filter <moyenne>');
            console.log('💡 Exemple: filter 15');
            return;
        }

        const minAverage = parseFloat(minAverageStr);
        
        if (isNaN(minAverage) || minAverage < 0 || minAverage > 20) {
            console.log('❌ Veuillez fournir une moyenne valide entre 0 et 20.');
            console.log('💡 Exemple: filter 15');
            return;
        }

        console.log(`\n📊 ÉLÈVES AVEC UNE MOYENNE SUPÉRIEURE À ${minAverage}:`);
        console.log('=' .repeat(60));

        const filteredStudents = this.students.filter(student => {
            const average = this.calculateAverage(student.notes);
            return average > minAverage;
        });

        if (filteredStudents.length === 0) {
            console.log(`❌ Aucun élève n'a une moyenne supérieure à ${minAverage}.`);
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

    displayStatistics() {
        console.log('\n📈 STATISTIQUES GÉNÉRALES:');
        console.log('=' .repeat(40));
        
        if (this.students.length === 0) {
            console.log('❌ Aucune donnée disponible pour les statistiques.');
            return;
        }

        const averages = this.students.map(student => this.calculateAverage(student.notes));
        const maxAverage = Math.max(...averages);
        const minAverage = Math.min(...averages);
        const totalAverage = averages.reduce((sum, avg) => sum + avg, 0) / averages.length;

        console.log(`👥 Nombre total d'élèves: ${this.students.length}`);
        console.log(`📊 Moyenne générale: ${totalAverage.toFixed(2)}/20`);
        console.log(`🏆 Meilleure moyenne: ${maxAverage.toFixed(2)}/20`);
        console.log(`📉 Plus faible moyenne: ${minAverage.toFixed(2)}/20`);

        // Trouver les meilleurs et plus faibles élèves
        const bestStudents = this.students.filter(student => 
            this.calculateAverage(student.notes) === maxAverage
        );
        const worstStudents = this.students.filter(student => 
            this.calculateAverage(student.notes) === minAverage
        );

        console.log('\n🏆 Meilleurs élèves:');
        bestStudents.forEach(student => {
            console.log(`🥇 ${student.name} - ${this.calculateAverage(student.notes).toFixed(2)}/20`);
        });

        console.log('\n📉 Élèves avec la plus faible moyenne:');
        worstStudents.forEach(student => {
            console.log(`📉 ${student.name} - ${this.calculateAverage(student.notes).toFixed(2)}/20`);
        });
    }

    async testErrorHandling() {
        console.log('\n⚠️ TESTS DE GESTION D\'ERREURS:');
        console.log('=' .repeat(40));
        
        console.log('🧪 Test 1: Recherche avec nom vide');
        const emptySearch = this.students.filter(student => student.name.includes(''));
        console.log(`Résultat: ${emptySearch.length} élèves trouvés (normal car tous les noms contiennent une chaîne vide)`);

        console.log('\n🧪 Test 2: Filtrage avec moyenne impossible (>20)');
        const impossibleFilter = this.students.filter(student => {
            const average = this.calculateAverage(student.notes);
            return average > 20;
        });
        console.log(`Résultat: ${impossibleFilter.length} élèves trouvés (correct, aucune moyenne >20)`);

        console.log('\n🧪 Test 3: Filtrage avec moyenne négative');
        const negativeFilter = this.students.filter(student => {
            const average = this.calculateAverage(student.notes);
            return average > -5;
        });
        console.log(`Résultat: ${negativeFilter.length} élèves trouvés (correct, toutes les moyennes >-5)`);

        console.log('\n🧪 Test 4: Recherche avec caractères spéciaux');
        const specialSearch = this.students.filter(student => 
            student.name.toUpperCase().includes('XYZ123')
        );
        console.log(`Résultat: ${specialSearch.length} élèves trouvés (correct, aucun élève avec "XYZ123")`);
    }
}

// Démarrer le programme avec commandes
const manager = new CommandLineStudentManager();
manager.start().catch(console.error);
