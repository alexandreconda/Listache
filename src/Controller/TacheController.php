<?php
namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\BrowserKit\Request;
use App\Entity\Tache;
use App\Repository\TacheRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpKernel\HttpKernel;

class TacheController extends AbstractController
{
    
    #[Route('/tache', name: 'tache_getAll', methods: ['GET'])]
    public function getAll(EntityManagerInterface $entityManager, SerializerInterface $serializer): JsonResponse
    {
//         $listeTaches = $entityManager->getRepository(Tache::class)->findBy(array(), array('echeance'=>'asc'));
        $listeTaches = $entityManager->getRepository(Tache::class)->findBy(array());
        $jsonListeTaches = $serializer->serialize($listeTaches, 'json');
        $response = new JsonResponse(['code' => 200, 'taches' => $jsonListeTaches]);
        return $response;
    }
    
    #[Route('/tache/{id}', name: 'tache_getById', methods: ['GET'])]
    public function getById(EntityManagerInterface $entityManager): JsonResponse
    {
        $response = new JsonResponse(['code' => 200]);
        return $response;
    }
    
    #[Route('/tache/{id}', name: 'tache_post', methods: ['POST'])]
    public function post(Tache $tache, EntityManagerInterface $entityManager): JsonResponse
    {
        $response = new JsonResponse(['code' => 200]);
        return $response;
    }
    
    #[Route('/tache/{id}', name: 'tache_put', methods: ['PUT'])]
    public function put(Tache $tache, EntityManagerInterface $entityManager): JsonResponse
    {
        $response = new JsonResponse(['code' => 200]);
        return $response;
    }
    
    #[Route('/tache/{id}', name: 'tache_delete', methods: ['DELETE'])]
    public function delete(Tache $tache, EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->getRepository(Tache::class)->remove($tache, true);
        $response = new JsonResponse(['code' => 200]);
        return $response;
    }
}