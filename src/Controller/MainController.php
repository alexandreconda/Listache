<?php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class MainController extends AbstractController
{
    #[Route('/test', name: 'main')]
    public function index(): Response
    {
        
        return new Response(
            '
            <html>
                <body>
                    <h1>Liste des tâches</h1>
                </body>
            </html>'
            );
    }
}