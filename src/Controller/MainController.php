<?php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\BrowserKit\Request;
use App\Entity\Tache;
use App\Repository\TacheRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpKernel\HttpKernel;

class MainController extends AbstractController
{
    
    #[Route('/', name: 'index')]
    public function index(EntityManagerInterface $entityManager): Response
    {
        return $this->liste($entityManager);
    }
    
    #[Route('/liste', name: 'liste')]
    public function liste(EntityManagerInterface $entityManager): Response
    {
        
//         $listeTaches = array(
//             array("nom"=>"Acheter du pain", "importance" =>"Importance basse", "etat"=>"Fait", "echeance"=>"18/03/2023", "groupe"=>"Personnel"),
//             array("nom"=>"Débarasser le garage", "importance" =>"Importance très basse", "etat"=>"A faire", "echeance"=>"18/03/2023", "groupe"=>"Personnel"),
//             array("nom"=>"Rédiger un dossier sur les enjeux de la transition numérique", "importance" =>"Importance très haute", "etat"=>"En cours", "echeance"=>"04/06/2023", "groupe"=>"Collectif des jeunes entrepreneurs toulousains innovants et ambitieux"),
//             array("nom"=>"Remplir le formulaire d'adhésion", "importance" =>"Importance normale", "etat"=>"Fait", "echeance"=>"24/03/2023", "groupe"=>"Personnel"),
//         );

        $listeTaches = $entityManager->getRepository(Tache::class)->findBy(array(), array('echeance'=>'asc'));
        
        return $this->render('liste.html.twig',[
            'liste_taches' => $listeTaches
        ]);
    }
    
    #[Route('/calendrier', name: 'calendrier')]
    public function calendrier(): Response
    {
        return $this->render('calendrier.html.twig');
    }
    
    #[Route('/projet', name: 'projet')]
    public function projet(): Response
    {
        return $this->render('projet.html.twig');
    }
}