#include <stdio.h>
#include <stdlib.h>

void saisirMatrice(int lignes, int colonnes, float matrice[10][10]) {
    for(int i = 0; i < lignes; i++) {
        for(int j = 0; j < colonnes; j++) {
            printf("Entrez l'element [%d][%d] : ", i+1, j+1);
            scanf("%f", &matrice[i][j]);
        }
    }
}

void afficherMatrice(int lignes, int colonnes, float matrice[10][10]) {
    printf("Resultat :\n");
    for(int i = 0; i < lignes; i++) {
        for(int j = 0; j < colonnes; j++) {
            printf("%.1f ", matrice[i][j]);
        }
        printf("\n");
    }
}

void additionMatrices(int lignes, int colonnes, float matrice1[10][10], float matrice2[10][10], float resultat[10][10]) {
    for(int i = 0; i < lignes; i++) {
        for(int j = 0; j < colonnes; j++) {
            resultat[i][j] = matrice1[i][j] + matrice2[i][j];
        }
    }
}

void multiplicationMatrices(int lignes1, int colonnes1, int colonnes2, float matrice1[10][10], float matrice2[10][10], float resultat[10][10]) {
    for(int i = 0; i < lignes1; i++) {
        for(int j = 0; j < colonnes2; j++) {
            resultat[i][j] = 0;
            for(int k = 0; k < colonnes1; k++) {
                resultat[i][j] += matrice1[i][k] * matrice2[k][j];
            }
        }
    }
}

void produitParReel(int lignes, int colonnes, float matrice[10][10], float reel, float resultat[10][10]) {
    for(int i = 0; i < lignes; i++) {
        for(int j = 0; j < colonnes; j++) {
            resultat[i][j] = matrice[i][j] * reel;
        }
    }
}

int main() {
    float matrice1[10][10], matrice2[10][10], resultat[10][10];
    int choix, lignes, colonnes, lignes2, colonnes2;
    float reel;

    do {
        // Affichage du menu
        printf("\n===== MENU =====\n");
        printf("1. Addition de deux matrices\n");
        printf("2. Multiplication de deux matrices\n");
        printf("3. Produit d'une matrice par un reel\n");
        printf("4. Quitter\n");
        printf("Entrez votre choix : ");
        scanf("%d", &choix);

        switch(choix) {
            case 1:
                printf("Entrez le nombre de lignes et de colonnes : ");
                scanf("%d %d", &lignes, &colonnes);
                
                printf("Saisie de la premiere matrice :\n");
                saisirMatrice(lignes, colonnes, matrice1);
                
                printf("Saisie de la deuxieme matrice :\n");
                saisirMatrice(lignes, colonnes, matrice2);
                
                additionMatrices(lignes, colonnes, matrice1, matrice2, resultat);
                afficherMatrice(lignes, colonnes, resultat);
                break;

            case 2:
                printf("Entrez le nombre de lignes et de colonnes de la premiere matrice : ");
                scanf("%d %d", &lignes, &colonnes);
                printf("Entrez le nombre de colonnes de la deuxieme matrice : ");
                scanf("%d", &colonnes2);
                
                printf("Saisie de la premiere matrice :\n");
                saisirMatrice(lignes, colonnes, matrice1);
                
                printf("Saisie de la deuxieme matrice :\n");
                saisirMatrice(colonnes, colonnes2, matrice2);
                
                multiplicationMatrices(lignes, colonnes, colonnes2, matrice1, matrice2, resultat);
                afficherMatrice(lignes, colonnes2, resultat);
                break;

            case 3:
                printf("Entrez le nombre de lignes et de colonnes : ");
                scanf("%d %d", &lignes, &colonnes);
                
                printf("Saisie de la matrice :\n");
                saisirMatrice(lignes, colonnes, matrice1);
                
                printf("Entrez le nombre reel : ");
                scanf("%f", &reel);
                
                produitParReel(lignes, colonnes, matrice1, reel, resultat);
                afficherMatrice(lignes, colonnes, resultat);
                break;

            case 4:
                printf("Au revoir!\n");
                break;

            default:
                printf("Choix invalide!\n");
        }
    } while(choix != 4);

    return 0;
}