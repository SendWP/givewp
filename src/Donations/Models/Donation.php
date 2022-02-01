<?php

namespace Give\Donations\Models;

use DateTime;
use Give\Donations\ValueObjects\DonationStatus;
use Give\Donors\Models\Donor;
use Give\Framework\Database\Exceptions\DatabaseQueryException;
use Give\Subscriptions\Models\Subscription;

/**
 * Class Donation
 *
 * @unreleased
 */
class Donation
{
    /**
     * @var int
     */
    public $id;
    /**
     * @var int
     */
    public $sequentialId;
    /**
     * @var int
     */
    public $parentId;
    /**
     * @var int
     */
    public $subscriptionId;
    /**
     * @var DateTime
     */
    public $createdAt;
    /**
     * @var DateTime
     */
    public $updatedAt;
    /**
     * @var int
     */
    public $amount;
    /**
     * @var string
     */
    public $currency;
    /**
     * @var string
     */
    public $gateway;
    /**
     * @var DonationStatus
     */
    public $status;
    /**
     * @var int
     */
    public $donorId;
    /**
     * @var string
     */
    public $firstName;
    /**
     * @var string
     */
    public $lastName;
    /**
     * @var string
     */
    public $email;

    /**
     * @param  int  $amount
     * @param  string  $currency
     * @param  int  $donorId
     * @param  string  $firstName
     * @param  string  $lastName
     * @param  string  $email
     */
    public function __construct($amount, $currency, $donorId, $firstName, $lastName, $email)
    {
        $this->amount = $amount;
        $this->currency = $currency;
        $this->donorId = $donorId;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->email = $email;
        $this->status = DonationStatus::PENDING();
    }

    /**
     * Find donation by ID
     *
     * @unreleased
     *
     * @param  int  $id
     * @return Donation
     */
    public static function find($id)
    {
        return give()->donationRepository->getById($id);
    }

    /**
     * @unreleased
     *
     * @return Donor
     */
    public function donor()
    {
        return give()->donorRepository->getById($this->donorId);
    }

    /**
     * @unreleased
     *
     * @return Subscription
     */
    public function subscription()
    {
        if ($this->subscriptionId) {
            return give()->subscriptionRepository->getById($this->subscriptionId);
        }

        return give()->subscriptionRepository->getByDonationId($this->id);
    }

    /**
     * @param  Donation  $donation
     * @return Donation
     * @throws DatabaseQueryException
     */
    public static function create(Donation $donation)
    {
        return give()->donationRepository->insert($donation);
    }

    /**
     * @return Donation
     * @throws DatabaseQueryException
     */
    public function save()
    {
        if (!$this->id) {
            return give()->donationRepository->insert($this);
        }
        return give()->donationRepository->update($this);
    }

    /**
     * @return array
     */
    public function getMeta()
    {
        return give()->donationRepository->getMeta($this);
    }
}